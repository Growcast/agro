import { Brain, Cpu, Wifi, BarChart, Droplet, Shield, Truck } from "lucide-react";

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description: "Algoritmos de Deep Learning que analizan patrones y predicen el comportamiento de tus cultivos."
    },
    {
      icon: Cpu,
      title: "Internet de las Cosas (IoT)",
      description: "Sensores inteligentes que monitorean temperatura, humedad, pH y nutrientes en tiempo real."
    },
    {
      icon: Wifi,
      title: "Control Ambiental",
      description: "Automatización completa de sistemas de ventilación, calefacción y enfriamiento."
    },
    {
      icon: Droplet,
      title: "Gestión Inteligente del Agua",
      description: "Sistemas de riego automatizado con control preciso de nutrientes y pH."
    },
    {
      icon: BarChart,
      title: "Trazabilidad Completa",
      description: "Seguimiento detallado desde la siembra hasta la cosecha con reportes automáticos."
    },
    {
      icon: Shield,
      title: "Control Productivo",
      description: "Monitoreo de calidad, detección temprana de plagas y optimización de cosechas."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-tech-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Plataforma SaaS <span className="gradient-text">Todo en Uno</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Nuestra solución integral combina hardware especializado con una plataforma SaaS avanzada 
            para la gestión completa de cultivos intensivos con tecnología de vanguardia.
          </p>
        </div>

        {/* Main Feature */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-tech-blue rounded-xl flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-foreground">Hardware + Software</h3>
                <p className="text-muted-foreground">Solución completa lista para implementar</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              Recibe todo el equipamiento necesario junto con acceso completo a nuestra plataforma SaaS. 
              Instalación rápida y soporte técnico especializado incluido.
            </p>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-tech-blue/10 rounded-lg flex items-center justify-center">
                  <solution.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;