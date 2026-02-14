# PRD - Sitio Web de Impresión 3D

## Problema Original
Crear una página web para una compañía de impresión 3D enfocada en:
- Servicios para estudiantes de arquitectura y arquitectos
- Servicios para diseñadores de interiores y estudiantes de diseño de interiores
- Producción empresarial (llaveros, artículos promocionales en masa)
- Proyectos de impresión personalizados

**Requisitos de diseño**: Moderno, corporativo, sobrio pero profesional
**Funcionalidad**: Carruseles de imágenes, formulario de contacto completo

---

## Arquitectura Técnica

### Stack
- **Frontend**: React 19, Tailwind CSS, shadcn/ui components
- **Backend**: FastAPI, Python 3.11
- **Base de datos**: MongoDB
- **File Storage**: Sistema de archivos local (/app/backend/uploads)

### API Endpoints
- `GET /api/` - Health check
- `POST /api/contact` - Crear submission de contacto con file upload
- `GET /api/contact` - Obtener todas las submissions
- `GET /api/contact/{id}` - Obtener submission específica

---

## User Personas

1. **Estudiante de Arquitectura/Diseño**
   - Necesita maquetas para proyectos académicos
   - Presupuesto limitado
   - Busca calidad y entrega rápida

2. **Arquitecto/Diseñador Profesional**
   - Proyectos de clientes
   - Requiere materiales premium y acabados profesionales
   - Necesita soporte técnico y revisiones de diseño

3. **Empresa Corporativa**
   - Producción en masa de artículos promocionales
   - Requiere branding y personalización
   - Busca precios por volumen y gestor dedicado

---

## Implementado (Diciembre 2024)

### ✅ Frontend Completo
- [x] Navegación fija con enlaces smooth scroll
- [x] Hero Section con gradiente, estadísticas y CTAs
- [x] Services Section con 3 tarjetas (Arquitectura, Diseño Interior, Empresarial)
- [x] About Section con imágenes profesionales y valores de la empresa
- [x] Pricing Section con 3 planes de precios
- [x] Gallery Section con 6 imágenes y modal de preview
- [x] Contact Section con formulario completo y file upload
- [x] Footer con información de contacto y enlaces sociales
- [x] Diseño responsive
- [x] Animaciones y hover effects

### ✅ Backend Completo
- [x] Endpoint POST /api/contact con FormData y file upload
- [x] Validación de tipos de archivo (.stl, .obj, .3mf, .step, .stp)
- [x] Almacenamiento de archivos en /app/backend/uploads
- [x] Guardado de submissions en MongoDB
- [x] Endpoint GET /api/contact para listar submissions
- [x] Manejo de errores y logging

### ✅ Integraciones
- [x] Frontend-Backend mediante axios con multipart/form-data
- [x] MongoDB para persistencia de datos
- [x] Toast notifications (Sonner) para feedback de usuario

### ✅ Testing
- Backend: 100% tests pasados
- Frontend: 95% tests pasados
- Integración end-to-end validada

---

## Backlog Priorizado

### P0 (Crítico) - Completado
- ✅ Todas las funcionalidades core implementadas

### P1 (Alta Prioridad)
- [ ] Integración de email para notificaciones (SendGrid/SMTP)
- [ ] Panel de administración para gestionar submissions
- [ ] Autenticación para área de administración
- [ ] Sistema de cotizaciones automatizado

### P2 (Media Prioridad)
- [ ] Blog/recursos para clientes
- [ ] Calculadora de precios interactiva
- [ ] Sistema de seguimiento de pedidos
- [ ] Galería ampliada con filtros por categoría
- [ ] Testimonios de clientes
- [ ] Chat en vivo o chatbot
- [ ] Multilenguaje (inglés)

### P3 (Mejoras Futuras)
- [ ] Integración con pasarela de pagos
- [ ] Sistema de pedidos online completo
- [ ] Viewer 3D para archivos STL/OBJ
- [ ] Herramienta de análisis de archivos 3D
- [ ] Sistema de descuentos y cupones
- [ ] Programa de referidos

---

## Próximos Pasos

1. **Integración de Email**: Configurar notificaciones por email cuando se recibe un formulario de contacto
2. **Panel Admin**: Crear dashboard para que el equipo pueda ver y gestionar las solicitudes de cotización
3. **SEO**: Optimizar meta tags, sitemap, y performance
4. **Analytics**: Integrar Google Analytics o similar para tracking

---

## Notas Técnicas

### Estructura de Archivos
```
/app/frontend/src/
├── pages/Home.jsx
├── components/
│   ├── HeroSection.jsx
│   ├── ServicesSection.jsx
│   ├── AboutSection.jsx
│   ├── PricingSection.jsx
│   ├── GallerySection.jsx
│   ├── ContactSection.jsx
│   └── Footer.jsx

/app/backend/
├── server.py
├── models/contact.py
├── routes/contact.py
└── uploads/
```

### Variables de Entorno
- `REACT_APP_BACKEND_URL`: URL del backend
- `MONGO_URL`: Conexión a MongoDB
- `DB_NAME`: Nombre de la base de datos

### Colección MongoDB
**contact_submissions**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string?",
  "service_type": "string",
  "message": "string",
  "file_name": "string?",
  "file_path": "string?",
  "created_at": "datetime",
  "status": "pending"
}
```
