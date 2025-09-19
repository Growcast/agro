/// <reference types="../functions/deno.d.ts" />

import { z } from "https://esm.sh/zod@3.23.8";
import { getEnvs } from "./envs.ts";
import {
  OdooLead,
  OdooLeadSchema,
  OdooPartner,
  OdooPartnerSchema,
  OdooResponseSchema,
} from "./validation.ts";

enum EndpointType {
  AUTHENTICATE,
  CALL,
}

// predefined tags
const TAGS = [
  4, // automatic
  5, // agro
];

// Landing stage
const DEFAULT_STAGE = 11;

// sales partner Mariano R
const SALES_PARTNER_ID = 12;

const getEndpoint = (type: EndpointType): string => {
  const { odooDbName } = getEnvs();

  switch (type) {
    case EndpointType.AUTHENTICATE:
      return `https://${odooDbName}.odoo.com/web/session/authenticate`;

    case EndpointType.CALL:
      return `https://${odooDbName}.odoo.com/web/dataset/call_kw`;

    default:
      throw new Error(`Invalid endpoint type: ${type}`);
  }
};

/**
 * This endpoint autenticates and returns the session is to be used in API requests
 * @returns {string} session_id
 */
export const authenticate = async (): Promise<string> => {
  const { odooDbName, odooDbUsername, odooDbPassword } = getEnvs();

  const endpoint = getEndpoint(EndpointType.AUTHENTICATE);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      params: {
        db: odooDbName,
        login: odooDbUsername,
        password: odooDbPassword,
      },
    }),
  });

  const rawSetCookie = response.headers.get("set-cookie");
  const sessionIdMatch = rawSetCookie?.match(/session_id=([^;]+)/);
  const sessionId = sessionIdMatch?.[1];

  if (!sessionId) {
    throw new Error("cannot_get_session_id");
  }

  return sessionId;
};

export const searchPartnerByEmail = async (
  email: string
): Promise<Array<OdooPartner>> => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  console.log(`[Odoo] Searching partner by email: ${email}`);
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "res.partner",
        method: "search_read",
        args: [],
        kwargs: {
          domain: [["email", "=", email]],
          fields: ["id", "name", "email"],
          limit: 1,
        },
      },
    }),
  });

  const json = await res.json();
  const parsed = OdooResponseSchema.parse(json);

  if (!parsed.result || !Array.isArray(parsed.result)) {
    throw new Error("Invalid response: expected array of partners");
  }

  return z.array(OdooPartnerSchema).parse(parsed.result);
};

export const createPartner = async (
  name: string,
  email: string
): Promise<number> => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "res.partner",
        method: "create",
        args: [
          {
            name: `Agro: ${name}`,
            email,
            customer_rank: 1,
            type: "contact",
          },
        ],
        kwargs: {},
      },
    }),
  });

  const json = await res.json();
  const parsed = OdooResponseSchema.parse(json);

  const partnerId = z.number().parse(parsed.result);
  console.log(`[Odoo] Partner created with ID: ${partnerId}`);

  return partnerId;
};

export const createLead = async (
  name: string,
  email: string,
  description: string,
  partnerId?: number
): Promise<number> => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "crm.lead",
        method: "create",
        args: [
          {
            name: `${name} - ${email}`,
            email_from: email,
            description,
            tag_ids: TAGS,
            stage_id: DEFAULT_STAGE,
            partner_id: partnerId,
          },
        ],
        kwargs: {},
      },
    }),
  });

  const json = await res.json();

  const parsed = OdooResponseSchema.parse(json);

  const leadId = z.number().parse(parsed.result);
  console.log(`[Odoo] Lead created with ID: ${leadId}`);

  return leadId;
};

export const searchLeadByPartner = async (
  partnerId: number
): Promise<Array<OdooLead>> => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  console.log(`[Odoo] Searching lead by partner ID: ${partnerId}`);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "crm.lead",
        method: "search_read",
        args: [],
        kwargs: {
          domain: [["partner_id", "=", partnerId]],
          fields: ["id", "name", "email_from", "description", "partner_id"],
          limit: 1,
        },
      },
    }),
  });

  const json = await res.json();

  const parsed = OdooResponseSchema.parse(json);

  if (!parsed.result || !Array.isArray(parsed.result)) {
    throw new Error("Invalid response: expected array of leads");
  }

  return z.array(OdooLeadSchema).parse(parsed.result);
};

export const addMessageToLead = async (
  leadId: number,
  message: string,
  author: number
): Promise<number> => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "mail.message",
        method: "create",
        kwargs: {},
        args: [
          {
            model: "crm.lead",
            res_id: leadId,
            body: message,
            message_type: "comment",
            // discuss, standard comment
            subtype_id: 1,
            author_id: author,
          },
        ],
      },
    }),
  });

  const json = await res.json();
  const parsed = OdooResponseSchema.parse(json);

  const messageId = z.number().parse(parsed.result);
  console.log(`[Odoo] Message created with ID: ${messageId}`);

  return messageId;
};

export const moveLeadToAnotherColumn = async (
  leadId: number,
  columnId: number
): Promise<void> => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  console.log(`[Odoo] Moving lead ${leadId} to stage ${columnId}`);
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "crm.lead",
        method: "write",
        kwargs: {},
        args: [[leadId], { stage_id: columnId }],
      },
    }),
  });
};

/**
 * Activate user notifications on specific lead
 * @param leadId number
 */
export const enableLeadNotifications = async (leadId: number) => {
  const sessionId = await authenticate();
  const endpoint = getEndpoint(EndpointType.CALL);

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "mail.followers",
        method: "create",
        args: [
          {
            res_model: "crm.lead",
            res_id: leadId,
            // mariano rafanelli
            partner_id: SALES_PARTNER_ID,
          },
        ],
        kwargs: {},
      },
    }),
  });

  console.log(
    `[Odoo] Partner ${SALES_PARTNER_ID} set as follower of lead ${leadId}`
  );
};
