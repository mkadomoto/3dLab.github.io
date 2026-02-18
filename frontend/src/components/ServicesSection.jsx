import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, Palette, Briefcase } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Building2 className="w-12 h-12 text-cyan-600" />,
      title: "Arquitectura",
      description: "Modelos arquitectónicos de alta precisión para estudiantes y profesionales. Ideal para presentaciones y maquetas de proyectos.",
      features: ["Maquetas a escala", "Alta precisión", "Múltiples materiales", "Acabados profesionales"],
      image: "https://images.unsplash.com/photo-1653164579768-ea97833b3b03",
      badge: "Más Popular"
    },
    {
      icon: <Palette className="w-12 h-12 text-blue-600" />,
      title: "Diseño de Interiores",
      description: "Prototipos y elementos decorativos personalizados para diseñadores de interiores y estudiantes de diseño.",
      features: ["Elementos decorativos", "Prototipos rápidos", "Colores personalizados", "Texturas variadas"],
      image: "https://images.unsplash.com/photo-1726136855707-b5787766d60f",
      badge: "Especializado"
    },
    {
      icon: <Briefcase className="w-12 h-12 text-orange-600" />,
      title: "Empresas y Corporativos",
      description: "Producción en volumen de artículos promocionales, llaveros, merchandising y productos personalizados para empresas.",
      features: ["Producción en masa", "Precios por volumen", "Branding corporativo", "Entrega programada"],
      image: "https://images.unsplash.com/photo-1611117775350-ac3950990985",
      badge: "Alto Volumen"
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200">Nuestros Servicios</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Soluciones de Impresión 3D
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Servicios especializados para cada necesidad, desde proyectos académicos hasta producción corporativa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-cyan-500 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-white text-slate-900">{service.badge}</Badge>
              </div>
              
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-600"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Printing CTA */}
        <div className="mt-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-cyan-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">¿Necesitas algo personalizado?</h3>
              <p className="text-slate-600 text-lg">
                Trabajamos con diseños personalizados. Envíanos tu archivo 3D y te daremos una cotización en 24 horas.
              </p>
            </div>
            <a 
              href="#contacto"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-medium whitespace-nowrap transition-colors"
            >
              Solicitar Proyecto Personalizado
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
