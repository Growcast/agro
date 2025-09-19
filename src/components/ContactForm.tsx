import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { CheckCircle, Send, Sprout } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabaseService } from '@/lib/supabase-service'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoCultivo: '',
    esCerrado: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('contact_form_submit')

      // Mapear los datos del formulario a la estructura de Supabase
      const contactData = {
        name: formData.nombre,
        email: formData.email,
        tipo_ambiente: formData.esCerrado,
        tipo_cultivo: formData.tipoCultivo,
        recaptcha_token: recaptchaToken
      }

      await supabaseService.submitContactForm(contactData)

      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: '¡Formulario enviado exitosamente!',
        description:
          'Nos pondremos en contacto contigo en las próximas 24 horas.'
      })
    } catch (error) {
      setIsSubmitting(false)
      console.error('Error submitting form:', error)

      if (error.message === 'RATE_LIMITED') {
        toast({
          title: 'Demasiados intentos',
          description:
            'Has enviado varios formularios recientemente. Intenta nuevamente en una hora.',
          variant: 'destructive'
        })
        return
      }

      if (error.message === 'CAPTCHA_FAILED') {
        toast({
          title: 'Verificación de seguridad falló',
          description: 'Por favor, recarga la página e intenta nuevamente.',
          variant: 'destructive'
        })
        return
      }

      toast({
        title: 'Error al enviar el formulario',
        description: 'Por favor, intenta nuevamente o contacta soporte.',
        variant: 'destructive'
      })
    }
  }

  if (isSubmitted) {
    return (
      <section className='py-20 bg-gradient-to-br from-primary/5 to-tech-blue/5'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <Card className='p-12 shadow-xl bg-white'>
              <div className='flex justify-center mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center'>
                  <CheckCircle className='h-8 w-8 text-white' />
                </div>
              </div>

              <h3 className='text-3xl font-bold mb-4 text-foreground'>
                ¡Gracias por tu interés!
              </h3>
              <p className='text-lg text-muted-foreground mb-8'>
                Hemos recibido tu solicitud de demo. Nuestro equipo de
                especialistas se pondrá en contacto contigo en las próximas 24
                horas para coordinar una demostración personalizada.
              </p>

              <div className='space-y-4 text-left bg-secondary/20 p-6 rounded-lg'>
                <h4 className='font-semibold text-foreground'>
                  Próximos pasos:
                </h4>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                    Análisis personalizado de tu operación actual
                  </li>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                    Demo en vivo de la plataforma Growcast
                  </li>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                    Propuesta técnica y económica a medida
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant='outline'
                className='mt-6'
              >
                Enviar otra consulta
              </Button>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-20 bg-gradient-to-br from-primary/5 to-tech-blue/5'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto'>
          <div className='text-center mb-12'>
            <div className='flex justify-center mb-6'>
              <div className='w-16 h-16 bg-gradient-to-br from-primary to-tech-blue rounded-full flex items-center justify-center'>
                <Sprout className='h-8 w-8 text-white' />
              </div>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-foreground'>
              Solicita tu <span className='gradient-text'>Demo Gratuita</span>
            </h2>
            <p className='text-xl text-muted-foreground'>
              Descubre cómo Growcast puede transformar tu producción. Completa
              el formulario y recibe una demostración personalizada.
            </p>
          </div>

          <Card className='p-8 md:p-12 shadow-2xl bg-white'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='nombre'>Nombre completo *</Label>
                  <Input
                    id='nombre'
                    type='text'
                    value={formData.nombre}
                    onChange={e => handleInputChange('nombre', e.target.value)}
                    className='form-input'
                    placeholder='Tu nombre completo'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email *</Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className='form-input'
                    placeholder='tu@email.com'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='tipoCultivo'>Tipo de cultivo *</Label>
                <Select
                  onValueChange={value =>
                    handleInputChange('tipoCultivo', value)
                  }
                  required
                >
                  <SelectTrigger className='form-input'>
                    <SelectValue placeholder='Selecciona tu tipo de cultivo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='frutilla'>Frutilla</SelectItem>
                    <SelectItem value='tomate'>Tomate</SelectItem>
                    <SelectItem value='lechuga'>Lechuga</SelectItem>
                    <SelectItem value='pimiento'>Pimiento</SelectItem>
                    <SelectItem value='arandano'>Arándano</SelectItem>
                    <SelectItem value='otro'>Otro cultivo intensivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='esCerrado'>Tipo de ambiente *</Label>
                <Select
                  onValueChange={value => handleInputChange('esCerrado', value)}
                  required
                >
                  <SelectTrigger className='form-input'>
                    <SelectValue placeholder='¿Cultivo cerrado o a cielo abierto?' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='invernadero'>Invernadero</SelectItem>
                    <SelectItem value='tunel'>Túnel</SelectItem>
                    <SelectItem value='campo-abierto'>Campo abierto</SelectItem>
                    <SelectItem value='hidroponico'>Hidropónico</SelectItem>
                    <SelectItem value='mixto'>Mixto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type='submit'
                className='w-full cta-primary text-lg py-4'
                disabled={isSubmitting}
                size='lg'
              >
                {isSubmitting ? (
                  <>
                    <div className='animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-5 w-5' />
                    Solicitar Demo Gratuita
                  </>
                )}
              </Button>
            </form>

            <p className='text-sm text-muted-foreground text-center mt-6'>
              * Campos obligatorios. Respetamos tu privacidad y no compartimos
              tus datos.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
