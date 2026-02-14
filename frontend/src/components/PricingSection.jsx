import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2 } from 'lucide-react';

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Estudiante",
      description: "Ideal para proyectos académicos",
      price: "Desde $15",
      unit: "por pieza",
      features: [
        "Maquetas hasta 15cm",
        "Material PLA estándar",
        "Entrega en 5-7 días",
        "1 revisión de diseño",
        "Soporte por email"
      ],
      popular: false
    },
    {
      name: "Profesional",
      description: "Para arquitectos y diseñadores",
      price: "Desde $35",
      unit: "por pieza",
      features: [
        "Maquetas hasta 30cm",
        "Materiales premium (ABS, PETG)",
        "Entrega en 3-5 días",
        "3 revisiones de diseño",
        "Acabados profesionales",
        "Soporte prioritario"
      ],
      popular: true
    },
    {
      name: "Empresarial",
      description: "Producción en volumen",
      price: "Personalizado",
      unit: "cotización",
      features: [
        "Piezas de cualquier tamaño",
        "Todos los materiales disponibles",
        "Entrega express disponible",
        "Revisiones ilimitadas",
        "Branding corporativo",
        "Gestor de cuenta dedicado",
        "Precios por volumen"
      ],
      popular: false
    }
  ];

  return (
    <section id="precios" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200">Precios</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Planes para Cada Necesidad
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Precios transparentes y competitivos. Sin costos ocultos ni sorpresas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${
                plan.popular 
                  ? 'border-2 border-cyan-500 shadow-2xl scale-105' 
                  : 'border border-slate-200 hover:shadow-xl'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-cyan-600 text-white px-4 py-1">Más Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-2">/ {plan.unit}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                  size="lg"
                >
                  <a href="#contacto">Solicitar Cotización</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            ¿Necesitas un proyecto personalizado o tienes preguntas sobre precios?
          </p>
          <Button variant="outline" className="border-2 border-slate-300 hover:border-cyan-600 hover:text-cyan-600">
            <a href="#contacto">Contactar para Cotización Personalizada</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
