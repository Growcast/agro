import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className='fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-border'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <img
              src='/lovable-uploads/b1d3655a-df39-4a53-b813-dbaa9b39d733.png'
              alt='Growcast Logo'
              className='w-8 h-8 object-contain'
            />
            <span className='text-xl font-bold logo-text'>Growcast</span>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <button
              onClick={() => scrollToSection('beneficios')}
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollToSection('soluciones')}
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Soluciones
            </button>
            <button
              onClick={() => scrollToSection('casos')}
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Casos de Uso
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className='hidden md:block'>
            <Button
              onClick={() => scrollToSection('contacto')}
              className='cta-primary'
            >
              Demo Gratuita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className='h-6 w-6 text-foreground' />
            ) : (
              <Menu className='h-6 w-6 text-foreground' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-border'>
            <nav className='flex flex-col space-y-4'>
              <button
                onClick={() => scrollToSection('beneficios')}
                className='text-left text-muted-foreground hover:text-primary transition-colors'
              >
                Beneficios
              </button>
              <button
                onClick={() => scrollToSection('soluciones')}
                className='text-left text-muted-foreground hover:text-primary transition-colors'
              >
                Soluciones
              </button>
              <button
                onClick={() => scrollToSection('casos')}
                className='text-left text-muted-foreground hover:text-primary transition-colors'
              >
                Casos de Uso
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className='text-left text-muted-foreground hover:text-primary transition-colors'
              >
                Contacto
              </button>
              <Button
                onClick={() => scrollToSection('contacto')}
                className='cta-primary w-full'
              >
                Demo Gratuita
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
