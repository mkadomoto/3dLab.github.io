import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Upload, Send } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Pre-fill message if coming from store
    const messageParam = searchParams.get('message');
    if (messageParam) {
      setFormData(prev => ({ ...prev, message: decodeURIComponent(messageParam) }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('service_type', formData.serviceType);
      formDataToSend.append('message', formData.message);
      
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await axios.post(`${API}/contact`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('¡Mensaje enviado!', {
        description: 'Nos pondremos en contacto contigo pronto.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
        file: null
      });
      setFileName('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error al enviar', {
        description: 'Por favor intenta de nuevo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <Toaster richColors position="top-right" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200">Contacto</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Comienza Tu Proyecto
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y te daremos una cotización personalizada en 24 horas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl">Solicitar Cotización</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo pronto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceType">Tipo de Servicio *</Label>
                  <Select 
                    value={formData.serviceType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arquitectura">Arquitectura</SelectItem>
                      <SelectItem value="diseno-interior">Diseño de Interiores</SelectItem>
                      <SelectItem value="corporativo">Corporativo / Empresarial</SelectItem>
                      <SelectItem value="personalizado">Proyecto Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe tu proyecto, dimensiones, materiales preferidos, fecha de entrega..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="file">Adjuntar Archivo 3D (opcional)</Label>
                  <div className="mt-2">
                    <label 
                      htmlFor="file" 
                      className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-lg p-6 cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-slate-500" />
                      <span className="text-slate-600">
                        {fileName || 'Subir archivo (.stl, .obj, .3mf)'}
                      </span>
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept=".stl,.obj,.3mf,.step,.stp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Solicitud
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">contacto@3dprintpro.com</p>
                    <p className="text-slate-600">ventas@3dprintpro.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Teléfono</h4>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                    <p className="text-slate-600">Lun - Vie: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Ubicación</h4>
                    <p className="text-slate-600">Calle Principal 123</p>
                    <p className="text-slate-600">Ciudad, País 12345</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100">
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">¿Cuánto tiempo toma una cotización?</h4>
                  <p className="text-slate-600 text-sm">Respondemos en menos de 24 horas hábiles.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">¿Qué formatos de archivo aceptan?</h4>
                  <p className="text-slate-600 text-sm">STL, OBJ, 3MF, STEP y la mayoría de formatos 3D.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">¿Hacen envíos?</h4>
                  <p className="text-slate-600 text-sm">Sí, enviamos a todo el país con opciones express.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
