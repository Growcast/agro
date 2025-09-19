import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import heroImage from '@/assets/hero-greenhouse.jpg'

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Hero Content */}
      <div className='relative z-10 container mx-auto px-4 text-center text-white'>
        <div className='max-w-4xl mx-auto animate-fade-in-up'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight'>
            Revoluciona tus{' '}
            <span className='gradient-text'>Cultivos Intensivos</span> con
            Tecnología Inteligente
          </h1>

          <p className='text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto'>
            Plataforma SaaS que combina hardware con IA, Deep Learning e IoT
            para maximizar el rendimiento de frutillas, tomates y lechugas en
            invernaderos y campo abierto.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button
              onClick={() => scrollToSection('contacto')}
              className='cta-primary text-lg px-8 py-4'
              size='lg'
            >
              Quiero una demo gratuita
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center'>
            <div className='animate-pulse-soft'>
              <div className='text-3xl md:text-4xl font-bold gradient-text'>
                +30%
              </div>
              <div className='text-lg text-gray-300'>
                Aumento de Rendimiento
              </div>
            </div>
            <div
              className='animate-pulse-soft'
              style={{ animationDelay: '0.2s' }}
            >
              <div className='text-3xl md:text-4xl font-bold gradient-text'>
                -20%
              </div>
              <div className='text-lg text-gray-300'>Reducción de Agua</div>
            </div>
            <div
              className='animate-pulse-soft'
              style={{ animationDelay: '0.4s' }}
            >
              <div className='text-3xl md:text-4xl font-bold gradient-text'>
                24/7
              </div>
              <div className='text-lg text-gray-300'>Monitoreo Automático</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
