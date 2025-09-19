/// <reference types="../deno.d.ts" />

// supabase/functions/submit-contact/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";

// Import utilities
import { verifyCaptcha, extractClientIp } from "../../utils/captcha.ts";
import { getEnvs } from "../../utils/envs.ts";
import {
  searchPartnerByEmail,
  createPartner,
  createLead,
  searchLeadByPartner,
  addMessageToLead,
  enableLeadNotifications,
} from "../../utils/odoo.ts";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Validation schema for the request body
const RequestSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  tipo_cultivo: z.string().optional().nullable(),
  tipo_ambiente: z.string().optional().nullable(),
  recaptcha_token: z.string().min(1, "Recaptcha token is required"),
  message: z.string().optional(), // Optional message for Odoo lead
});

type RequestBody = z.infer<typeof RequestSchema>;

// Initialize Supabase client
function getSupabaseClient() {
  const { supabaseUrl, supabaseServiceKey } = getEnvs();
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

// Rate limiting check
async function checkRateLimit(
  supabase: ReturnType<typeof getSupabaseClient>,
  email: string,
  ip?: string
): Promise<boolean> {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const conditions = [];
  if (email) conditions.push(`email.eq.${email}`);
  if (ip) conditions.push(`ip.eq.${ip}`);

  if (conditions.length === 0) {
    return true; // No conditions to check
  }

  const { count, error } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since)
    .or(conditions.join(","));

  if (error) {
    console.error("Rate limit check error:", error);
    throw new Error("rate_limit_check_failed");
  }

  return (count ?? 0) < 3;
}

// Save contact to database
async function saveContact(
  supabase: ReturnType<typeof getSupabaseClient>,
  data: RequestBody,
  ip?: string
) {
  const { data: result, error } = await supabase
    .from("contact_submissions")
    .insert([
      {
        name: data.name,
        email: data.email,
        tipo_cultivo: data.tipo_cultivo ?? null,
        tipo_ambiente: data.tipo_ambiente ?? null,
        ip: ip ?? null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Database insert error:", error);
    throw new Error("insert_failed");
  }

  return result;
}

// Odoo integration
async function processOdooIntegration(data: RequestBody) {
  // Skip if no email is provided
  if (!data.email) {
    console.log("Skipping Odoo integration: no email provided");
    return null;
  }

  try {
    console.log("Processing Odoo integration for email:", data.email);

    // Search for existing partner
    const partners = await searchPartnerByEmail(data.email);

    const humanizedDate = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const description = `<p><b>Tipo de cultivo:</b> ${data.tipo_cultivo}</p><p><b>Tipo de ambiente:</b> ${data.tipo_ambiente}</p><p><b>Fecha: </b>${humanizedDate}</p>`;

    let partnerId: number;
    let leadId: number;

    if (partners.length > 0) {
      // Partner exists
      partnerId = partners[0].id;
      console.log("Found existing partner:", partnerId);

      // Search for existing lead
      const leads = await searchLeadByPartner(partnerId);

      if (leads.length > 0) {
        // Lead exists, add message
        leadId = leads[0].id;
        console.log("Found existing lead:", leadId);

        await addMessageToLead(leadId, description, partnerId);
      } else {
        leadId = await createLead(
          data.name,
          data.email,
          description,
          partnerId
        );
        console.log("Created new lead:", leadId);

        // Enable notifications for sales team
        await enableLeadNotifications(leadId);
      }
    } else {
      // Create new partner
      partnerId = await createPartner(data.name, data.email);
      console.log("Created new partner:", partnerId);

      leadId = await createLead(data.name, data.email, description, partnerId);
      console.log("Created new lead:", leadId);

      // Enable notifications for sales team
      await enableLeadNotifications(leadId);
    }

    return { partnerId, leadId };
  } catch (error) {
    console.error("Odoo integration error:", error);
    // Don't fail the whole request if Odoo integration fails
    return null;
  }
}

// Main handler
serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only allow POST
    if (req.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = RequestSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "validation_failed",
          details: validationResult.error.format(),
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = validationResult.data;

    // Extract client IP
    const clientIp = extractClientIp(req.headers);

    // Verify captcha
    const { recaptchaSecret } = getEnvs();
    const captchaValid = await verifyCaptcha(
      data.recaptcha_token,
      recaptchaSecret,
      clientIp
    );

    if (!captchaValid) {
      return new Response(JSON.stringify({ error: "captcha_failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase
    const supabase = getSupabaseClient();

    // Check rate limit
    const withinLimit = await checkRateLimit(supabase, data.email, clientIp);
    if (!withinLimit) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save to database
    const dbResult = await saveContact(supabase, data, clientIp);

    // Process Odoo integration (non-blocking)
    const odooResult = await processOdooIntegration(data);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: dbResult,
        odoo: odooResult,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    const errorMessage = error instanceof Error ? error.message : "unexpected";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
