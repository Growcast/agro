import { TrendingUp, Droplets, Settings, BarChart3 } from 'lucide-react'

const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Aumento del Rendimiento',
      description:
        'Optimiza las condiciones de crecimiento para aumentar hasta un 30% la productividad de tus cultivos.',
      color: 'text-primary'
    },
    {
      icon: Droplets,
      title: 'Optimización del Riego',
      description:
        'Sistemas inteligentes que reducen el consumo de agua hasta un 20% manteniendo la calidad óptima.',
      color: 'text-tech-blue'
    },
    {
      icon: Settings,
      title: 'Automatización del Clima',
      description:
        'Control automático de temperatura, humedad y ventilación para condiciones perfectas 24/7.',
      color: 'text-primary-light'
    },
    {
      icon: BarChart3,
      title: 'Análisis Predictivo',
      description:
        'IA y Machine Learning para predecir problemas y optimizar decisiones en tiempo real.',
      color: 'text-tech-blue-dark'
    }
  ]

  return (
    <section className='py-20 bg-secondary/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 text-foreground'>
            Beneficios que <span className='gradient-text'>Transforman</span> tu
            Producción
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Nuestra tecnología integrada te permite alcanzar el máximo potencial
            de tus cultivos con decisiones basadas en datos en tiempo real.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className='benefit-card bg-white p-8 rounded-xl text-center'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-tech-blue/10 mb-6`}
              >
                <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
              </div>

              <h3 className='text-xl font-semibold mb-4 text-card-foreground'>
                {benefit.title}
              </h3>

              <p className='text-muted-foreground leading-relaxed'>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
