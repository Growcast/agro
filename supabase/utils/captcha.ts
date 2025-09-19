/**
 * Google reCAPTCHA verification utilities
 */

interface CaptchaResponse {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

/**
 * Verifies a reCAPTCHA token with Google's verification API
 * @param token - The reCAPTCHA token from the client
 * @param secret - The reCAPTCHA secret key
 * @param remoteIp - Optional IP address of the user
 * @returns true if verification passes, false otherwise
 */
export async function verifyCaptcha(
  token: string,
  secret: string,
  remoteIp?: string
): Promise<boolean> {
  if (!token || !secret) {
    console.error('Missing captcha token or secret')
    return false
  }

  const form = new URLSearchParams()
  form.set('secret', secret)
  form.set('response', token)
  if (remoteIp) {
    form.set('remoteip', remoteIp)
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    const json = await response.json() as CaptchaResponse

    // Log verification details for debugging
    console.log('Captcha verification result:', {
      success: json.success,
      score: json.score,
      action: json.action,
      errors: json['error-codes']
    })

    // Check if verification was successful
    if (!json.success) {
      console.error('Captcha verification failed:', json['error-codes'])
      return false
    }

    // For reCAPTCHA v3, check score threshold (0.5 is a reasonable default)
    if (typeof json.score === 'number' && json.score < 0.5) {
      console.warn(`Captcha score too low: ${json.score}`)
      return false
    }

    return true
  } catch (error) {
    console.error('Error verifying captcha:', error)
    return false
  }
}

/**
 * Extracts client IP from request headers
 * Checks common headers used by proxies and edge runtimes
 */
export function extractClientIp(headers: Headers): string | undefined {
  const hdrs = Object.fromEntries(headers.entries())

  return (
    hdrs['x-real-ip'] ||
    hdrs['x-forwarded-for']?.split(',')[0]?.trim() ||
    hdrs['cf-connecting-ip'] || // Cloudflare
    hdrs['x-client-ip'] ||
    undefined
  )
}