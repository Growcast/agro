import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-foreground text-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-2xl font-bold mb-4 gradient-text'>Growcast</h3>
            <p className='text-gray-300 mb-6 leading-relaxed'>
              Revolucionamos la agricultura intensiva con tecnología
              inteligente. Nuestra plataforma SaaS combina IoT, IA y Deep
              Learning para maximizar el rendimiento de tus cultivos.
            </p>

            <div className='flex space-x-4'>
              <a
                href='https://www.linkedin.com/company/growcast-io'
                className='w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors'
                aria-label='LinkedIn'
                target='_blank'
              >
                <Linkedin className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Contacto</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <MapPin className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-gray-300 text-sm'>
                    Av. Francia 2382 <br />
                    Rosario, Santa Fe
                    <br />
                    Argentina. CP: 2000.
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 text-tech-blue flex-shrink-0' />
                <a
                  href='tel:+5493814567890'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  +54 9 341 5703835
                </a>
              </div>

              <div className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 text-primary flex-shrink-0' />
                <a
                  href='mailto:info@growcast.com.ar'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  info@growcast.io
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Enlaces Rápidos</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  Nuestros Servicios
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  Blog Técnico
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  Soporte Técnico
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors text-sm'
                >
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-600 mt-12 pt-8 text-center'>
          <p className='text-gray-300 text-sm'>
            © 2024 Growcast. Todos los derechos reservados. | Desarrollando el
            futuro de la agricultura argentina.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
