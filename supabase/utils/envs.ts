/// <reference types="../functions/deno.d.ts" />

/**
 * Environment variables management for edge functions
 */

interface Envs {
  supabaseUrl: string
  supabaseServiceKey: string
  recaptchaSecret: string
  odooDbName: string
  odooDbUsername: string
  odooDbPassword: string
}

let cachedEnvs: Envs | null = null

/**
 * Get and validate environment variables
 * Caches the result for subsequent calls
 */
export function getEnvs(): Envs {
  if (cachedEnvs) {
    return cachedEnvs
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const recaptchaSecret = Deno.env.get('RECAPTCHA_SECRET')
  const odooDbName = Deno.env.get('ODOO_DB_NAME')
  const odooDbUsername = Deno.env.get('ODOO_DB_USERNAME')
  const odooDbPassword = Deno.env.get('ODOO_DB_PASSWORD')

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing required Supabase environment variables')
  }

  if (!recaptchaSecret) {
    throw new Error('Missing RECAPTCHA_SECRET environment variable')
  }

  if (!odooDbName || !odooDbUsername || !odooDbPassword) {
    throw new Error('Missing required Odoo environment variables')
  }

  cachedEnvs = {
    supabaseUrl,
    supabaseServiceKey,
    recaptchaSecret,
    odooDbName,
    odooDbUsername,
    odooDbPassword
  }

  return cachedEnvs
}

/**
 * Check if all required environment variables are set
 * Used for initialization checks
 */
export function validateEnvs(): boolean {
  try {
    getEnvs()
    return true
  } catch (error) {
    console.error('Environment validation failed:', error)
    return false
  }
}