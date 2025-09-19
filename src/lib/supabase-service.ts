import { supabase } from '@/integrations/supabase/client'
import { FunctionsHttpError } from '@supabase/supabase-js'

type ContactFormData = {
  name: string
  email: string
  tipo_cultivo?: string
  tipo_ambiente?: string
  recaptcha_token: string
}

export const supabaseService = {
  async submitContactForm (data: ContactFormData) {
    try {
      const { data: result, error } = await supabase.functions.invoke(
        'submit-contact',
        {
          body: {
            name: data.name,
            email: data.email,
            tipo_cultivo: data.tipo_cultivo ?? null,
            tipo_ambiente: data.tipo_ambiente ?? null,
            recaptcha_token: data.recaptcha_token
          }
        }
      )

      if (error) {
        console.error('Error submitting contact form (edge):', error)

        throw await toFriendlyError(error)
      }
    } catch (error) {
      console.error('Supabase service error (edge):', error)
      throw error
    }
  }
}

// Mapea el error de Edge Function a un código simple para la UI
async function toFriendlyError (err: unknown): Promise<Error> {
  if (err instanceof FunctionsHttpError) {
    const res = err.context
    let payload: unknown = null
    try {
      payload = await res.clone().json()
    } catch {
      console.warn('no error json payload')
    }
    if (!payload) {
      try {
        payload = await res.text()
      } catch {
        console.warn('no error text payload')
      }
    }
    console.log('parsing error', err)
    let code: string | undefined
    if (typeof payload === 'object' && payload !== null) {
      if (
        'error' in payload &&
        typeof (payload as { error: unknown }).error === 'string'
      ) {
        code = (payload as { error: string }).error
      } else if (
        'code' in payload &&
        typeof (payload as { code: unknown }).code === 'string'
      ) {
        code = (payload as { code: string }).code
      }
    }

    if (code === 'rate_limited') return new Error('RATE_LIMITED')
    if (code === 'captcha_failed') return new Error('CAPTCHA_FAILED')
    if (typeof code === 'string' && code) return new Error(code.toUpperCase())
    if (
      typeof err === 'object' &&
      err !== null &&
      'status' in err &&
      (err as { status: unknown }).status === 429
    ) {
      return new Error('RATE_LIMITED')
    }

    return new Error('EDGE_FUNCTION_ERROR')
  }

  if (typeof err === 'object' && err !== null) {
    if ('status' in err && (err as { status: unknown }).status === 429) {
      return new Error('RATE_LIMITED')
    }
    if (
      'message' in err &&
      typeof (err as { message: unknown }).message === 'string'
    ) {
      return new Error((err as { message: string }).message)
    }
  }
  return new Error('EDGE_FUNCTION_ERROR')
}
