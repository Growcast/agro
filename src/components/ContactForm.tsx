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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoCultivo: '',
    esCerrado: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get environment mapping for tipo_ambiente
    const ambienteMap: Record<string, string> = {
      'invernadero': 'invernadero',
      'tunel': 'túnel',
      'campo-abierto': 'campo abierto',
      'hidroponico': 'hidropónico',
      'mixto': 'mixto'
    }

    // Build WhatsApp message from template
    const message = `Hola, soy ${formData.nombre}. Tengo un cultivo de ${formData.tipoCultivo} en ${ambienteMap[formData.esCerrado] || formData.esCerrado} y me interesa conocer más sobre Growcast. ¿Podemos coordinar una llamada?`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // Get WhatsApp number from environment
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
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
                size='lg'
              >
                <Send className='mr-2 h-5 w-5' />
                Contactar por WhatsApp
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
