# 📇 VCARD — Tarjeta Digital de Contacto

Una tarjeta de contacto digital profesional, moderna y completamente responsive. Comparte tus datos de contacto con estilo.

## ✨ Características

- 🎨 **Diseño Premium** — Estilo moderno con animaciones suaves y glassmorphism
- 📱 **100% Responsive** — Optimizado para móviles, tabletas y escritorio
- 💾 **Guardar Contacto** — Descarga un archivo `.vcf` compatible con cualquier agenda
- 📤 **Compartir** — WhatsApp, copiar enlace o API nativa del navegador
- 📞 **Acciones Rápidas** — Llamar, email, WhatsApp, web, mapa, LinkedIn
- 🔗 **Redes Sociales** — LinkedIn, Instagram, Facebook, X, TikTok, YouTube
- 📸 **Código QR** — Generado automáticamente para compartir con un escaneo
- 🔍 **SEO Optimizado** — Open Graph, Twitter Cards, Schema.org
- ♿ **Accesible** — Semántico, con ARIA labels y soporte de teclado
- 🖨️ **Imprimible** — Estilos de impresión incluidos

## 🚀 Uso

1. Abre `index.html` en tu navegador
2. ¡Listo! La tarjeta funciona sin servidor

### Personalización

Edita el objeto `contactData` en [`script.js`](script.js) con tus datos:

```javascript
const contactData = {
  firstName: 'Tu Nombre',
  lastName: 'Tu Apellido',
  fullName: 'Tu Nombre Completo',
  title: 'Tu Cargo',
  company: 'Tu Empresa',
  bio: 'Tu descripción profesional...',
  phone: '+XX XXX XXX XXXX',
  email: 'tu@email.com',
  website: 'https://tuweb.com',
  // ... más campos
};
```

### Imágenes

Reemplaza los archivos en la carpeta `assets/`:
- `banner.jpg` — Imagen de banner (recomendado: 1200x400px)
- `avatar.jpg` — Foto de perfil (recomendado: 400x400px, cuadrada)

## 📁 Estructura

```
VCARD/
├── index.html      # Página principal
├── styles.css      # Estilos premium
├── script.js       # Lógica y datos
├── README.md       # Documentación
└── assets/
    ├── banner.jpg  # Imagen de cabecera
    └── avatar.jpg  # Foto de perfil
```

## 🌐 Despliegue

Al ser archivos estáticos, puedes desplegarlo en:

- **GitHub Pages** — Gratis, conecta tu repositorio
- **Netlify** — Arrastra y suelta la carpeta
- **Vercel** — Conecta tu repo
- **Firebase Hosting** — `firebase deploy`
- **Cualquier hosting** — Sube los archivos via FTP

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Diseño, animaciones, responsive |
| JavaScript ES6+ | Lógica, vCard, QR |
| Plus Jakarta Sans | Tipografía |
| Font Awesome 6 | Iconografía |
| QRCode.js | Generación de QR |

## 📄 Licencia

MIT — Úsalo como quieras.
