import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-tech-blue/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 shadow-2xl bg-white/95 backdrop-blur-sm border-0">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-tech-blue rounded-full flex items-center justify-center">
                <Quote className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium text-card-foreground mb-8 leading-relaxed">
              "Desde que implementamos Growcast en nuestros invernaderos de frutillas, 
              aumentamos la producción un 42% y redujimos el uso de agua un 35%. 
              La plataforma es intuitiva y el soporte técnico excepcional."
            </blockquote>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-tech-blue/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JM</span>
              </div>
              
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg text-card-foreground">Juan Manuel Rodriguez</p>
                <p className="text-muted-foreground">Productor de Frutillas</p>
                <p className="text-sm text-muted-foreground">Establecimiento San Miguel, Tucumán</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">42%</div>
                <div className="text-sm text-muted-foreground">Aumento Producción</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-tech-blue">35%</div>
                <div className="text-sm text-muted-foreground">Ahorro de Agua</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-light">6</div>
                <div className="text-sm text-muted-foreground">Meses de ROI</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;