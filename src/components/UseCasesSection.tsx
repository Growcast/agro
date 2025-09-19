import { Card } from '@/components/ui/card'
import strawberryImage from '@/assets/strawberry-greenhouse.jpg'
import lettuceImage from '@/assets/lettuce-hydroponic.jpg'
import tomatoImage from '@/assets/tomato-field.jpg'
import heroImage from '@/assets/hero-greenhouse.jpg'

const UseCasesSection = () => {
  const useCases = [
    {
      title: 'Frutilla en Invernadero',
      description:
        'Control preciso de temperatura y humedad para maximizar la calidad y cantidad de frutos. Monitoreo continuo del crecimiento y detección temprana de enfermedades.',
      image: strawberryImage,
      stats: '+30% rendimiento',
      features: [
        'Control climático 24/7',
        'Optimización de riego',
        'Detección de plagas'
      ]
    },
    {
      title: 'Tomate bajo Cubierta',
      description:
        'Gestión automatizada del ambiente para cultivos de tomate con sistemas de ventilación inteligente y control nutricional preciso.',
      image: heroImage,
      stats: '+35% producción',
      features: [
        'Automatización completa',
        'Control nutricional',
        'Trazabilidad total'
      ]
    },
    {
      title: 'Lechuga Hidropónica',
      description:
        'Sistemas verticales con control preciso de pH, EC y nutrientes. Optimización del ciclo de crecimiento con iluminación LED inteligente.',
      image: lettuceImage,
      stats: '-40% tiempo cultivo',
      features: [
        'Sistema hidropónico',
        'Control de nutrientes',
        'Iluminación LED'
      ]
    },
    {
      title: 'Campo Abierto',
      description:
        'Monitoreo meteorológico avanzado y sistemas de riego inteligente para cultivos a cielo abierto. Predicción climática y alertas tempranas.',
      image: tomatoImage,
      stats: '-20% uso de agua',
      features: [
        'Monitoreo climático',
        'Riego inteligente',
        'Alertas predictivas'
      ]
    }
  ]

  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 text-foreground'>
            Casos de <span className='gradient-text'>Éxito Comprobados</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Nuestra tecnología se adapta a diferentes tipos de cultivos y
            ambientes, desde invernaderos controlados hasta campo abierto.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className='overflow-hidden hover:shadow-xl transition-all duration-300 group'
            >
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium'>
                  {useCase.stats}
                </div>
              </div>

              <div className='p-8'>
                <h3 className='text-2xl font-bold mb-4 text-card-foreground'>
                  {useCase.title}
                </h3>

                <p className='text-muted-foreground mb-6 leading-relaxed'>
                  {useCase.description}
                </p>

                <div className='space-y-2'>
                  <h4 className='font-semibold text-card-foreground mb-3'>
                    Características principales:
                  </h4>
                  <ul className='space-y-2'>
                    {useCase.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className='flex items-center text-sm text-muted-foreground'
                      >
                        <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection
