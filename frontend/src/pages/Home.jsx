import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Printer, 
  Building2, 
  Layers, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import PricingSection from '../components/PricingSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Printer className="w-8 h-8 text-cyan-600" />
              <span className="text-2xl font-bold text-slate-800">3D<span className="text-cyan-600">Print</span>Pro</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Inicio</a>
              <a href="#servicios" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Servicios</a>
              <a href="#sobre-nosotros" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Nosotros</a>
              <a href="#precios" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Precios</a>
              <a href="#galeria" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Galería</a>
              <a href="#contacto" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Contacto</a>
            </div>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <a href="#contacto">Cotizar Proyecto</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PricingSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
