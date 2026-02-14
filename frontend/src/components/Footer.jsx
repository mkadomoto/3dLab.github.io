import React from 'react';
import { Printer, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Printer className="w-8 h-8 text-cyan-500" />
              <span className="text-2xl font-bold text-white">3D<span className="text-cyan-500">Print</span>Pro</span>
            </div>
            <p className="text-slate-400 mb-4">
              Transformando ideas en realidad con tecnología de impresión 3D de vanguardia.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><a href="#servicios" className="hover:text-cyan-500 transition-colors">Impresión Arquitectura</a></li>
              <li><a href="#servicios" className="hover:text-cyan-500 transition-colors">Diseño de Interiores</a></li>
              <li><a href="#servicios" className="hover:text-cyan-500 transition-colors">Producción Corporativa</a></li>
              <li><a href="#servicios" className="hover:text-cyan-500 transition-colors">Proyectos Personalizados</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#sobre-nosotros" className="hover:text-cyan-500 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#galeria" className="hover:text-cyan-500 transition-colors">Portafolio</a></li>
              <li><a href="#precios" className="hover:text-cyan-500 transition-colors">Precios</a></li>
              <li><a href="#contacto" className="hover:text-cyan-500 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">contacto@3dprintpro.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Calle Principal 123, Ciudad, País</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 3DPrintPro. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">Términos y Condiciones</a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">Política de Privacidad</a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
