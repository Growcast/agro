import { z } from "https://esm.sh/zod@3.23.8";

/**
 * Contact form submission schema
 */
export const ContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  tipo_cultivo: z.string().optional().nullable(),
  tipo_ambiente: z.string().optional().nullable(),
  recaptcha_token: z.string().min(1, "Recaptcha token is required"),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;

/**
 * Odoo Lead creation schema
 */
export const OdooLeadSchema = z.object({
  id: z.number(),
  name: z.string(),
  email_from: z.string(),
  description: z.string(),
  partner_id: z.tuple([z.number(), z.string()]),
});

export type OdooLead = z.infer<typeof OdooLeadSchema>;

/**
 * Odoo Partner schema
 */
export const OdooPartnerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export type OdooPartner = z.infer<typeof OdooPartnerSchema>;

/**
 * Odoo API response schema
 */
export const OdooResponseSchema = z.object({
  jsonrpc: z.literal("2.0"),
  result: z.unknown(),
  error: z
    .object({
      code: z.number(),
      message: z.string(),
      data: z.unknown(),
    })
    .optional(),
});

/**
 * Quote items schema
 */
export const QuoteItemSchema = z.object({
  id: z.number(),
  quantity: z.number().positive(),
});

export type QuoteItem = z.infer<typeof QuoteItemSchema>;

/**
 * Environment variables schema
 */
export const EnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RECAPTCHA_SECRET: z.string().min(1),
  ODOO_DB_NAME: z.string().min(1),
  ODOO_DB_USERNAME: z.string().min(1),
  ODOO_DB_PASSWORD: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Helper function to validate and parse data
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("Validation error:", result.error.format());
    throw new Error(`Validation failed: ${result.error.message}`);
  }
  return result.data;
}

/**
 * Helper to assert non-empty array
 */
export function assertNonEmptyArray<T>(
  arr: T[],
  message = "Array cannot be empty"
): asserts arr is [T, ...T[]] {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error(message);
  }
}
