import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent } from './ui/dialog';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1653164579768-ea97833b3b03",
      title: "Maqueta Residencial Moderna",
      category: "Arquitectura",
      description: "Modelo arquitectónico a escala 1:100"
    },
    {
      image: "https://images.unsplash.com/photo-1761940546803-ad87f8155b6a",
      title: "Edificio Ornamental",
      category: "Arquitectura",
      description: "Detalle arquitectónico complejo"
    },
    {
      image: "https://images.unsplash.com/photo-1726136855707-b5787766d60f",
      title: "Prototipo de Diseño",
      category: "Diseño Interior",
      description: "Elemento decorativo personalizado"
    },
    {
      image: "https://images.pexels.com/photos/34367991/pexels-photo-34367991.jpeg",
      title: "Proceso de Producción",
      category: "Corporativo",
      description: "Producción en masa para empresa"
    },
    {
      image: "https://images.unsplash.com/photo-1642969164999-979483e21601",
      title: "Impresión de Alta Precisión",
      category: "Arquitectura",
      description: "Tecnología de punta en acción"
    },
    {
      image: "https://images.pexels.com/photos/31121900/pexels-photo-31121900.jpeg",
      title: "Componentes Industriales",
      category: "Corporativo",
      description: "Piezas técnicas especializadas"
    }
  ];

  return (
    <section id="galeria" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200">Galería</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explora algunos de los proyectos que hemos realizado para nuestros clientes
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
                  <Badge className="mb-2 bg-cyan-600 text-white">{item.category}</Badge>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Image Preview */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            {selectedImage && (
              <div>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4">
                  <Badge className="mb-2 bg-cyan-600 text-white">{selectedImage.category}</Badge>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedImage.title}</h3>
                  <p className="text-slate-600">{selectedImage.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">¿Listo para ver tu proyecto realizado?</p>
          <a href="#contacto" className="text-cyan-600 hover:text-cyan-700 font-semibold text-lg underline">
            Comienza tu proyecto ahora →
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
