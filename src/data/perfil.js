// Los archivos de public/ se piden a través de BASE_URL: en Vercel la base es
// "/" y en GitHub Pages "/Portafolio/", y una ruta absoluta fallaría allí.
const publico = (archivo) => `${import.meta.env.BASE_URL}${archivo}`;

export const PERFIL = {
  nombre: 'Angel Villorina',
  cargo: 'Desarrollador de Aplicaciones Web',
  foto: publico('yo.jpg'),
  gif: publico('Gabino-gif.gif'),
  presentacion: [
    'Soy estudiante de Desarrollo de Aplicaciones Web. Trabajo en el desarrollo y la resolución de problemas tecnológicos, convirtiendo problemas complejos en soluciones simples.',
    'Construyo productos reales para pymes y profesionales de cualquier sector: webs, aplicaciones y automatizaciones que sus dueños pueden gestionar solos, sin depender de nadie.',
  ],
  contacto: [
    {
      etiqueta: 'Email',
      valor: 'villorinaangelandres@gmail.com',
      href: 'mailto:villorinaangelandres@gmail.com',
      // El más largo: en rejilla horizontal ocupa dos columnas para no partirse
      ancho: true,
    },
    { etiqueta: 'Teléfono', valor: '+34 641 565 926', href: 'tel:+34641565926' },
    { etiqueta: 'Cumpleaños', valor: '16 de septiembre, 2003' },
    { etiqueta: 'Ubicación', valor: 'Mérida, España' },
  ],
  redes: [
    { nombre: 'GitHub', href: 'https://github.com/glitterboy16' },
    { nombre: 'Instagram', href: 'https://www.instagram.com/glitterboy.vc?igsh=YmNoajE5ZTV5b3hv&utm_source=qr' },
  ],
  educacion: [
    {
      titulo: 'Desarrollo de Aplicaciones Web',
      fecha: '2024 — Presente',
      descripcion:
        'Estudiando desarrollo de aplicaciones web en el IES Albarregas con HTML, CSS, JavaScript y Java, además de otras tecnologías.',
    },
  ],

  experiencia: [
    {
      titulo: 'Prácticas en Veyve Technology',
      // El enlace queda pendiente de que Angel confirme cuál es el bueno
      empresa: 'Veyve Technology',
      fecha: '2025 — 2026',
      descripcion:
        'Participación en proyectos reales del equipo durante el periodo de prácticas, trabajando sobre el mismo código y los mismos plazos que el resto de desarrolladores.',
    },
  ],
  servicios: [
    {
      titulo: 'Desarrollo de páginas y aplicaciones web',
      descripcion:
        'Sitios y aplicaciones a medida con React, Tailwind y JavaScript, del diseño al despliegue, para cualquier sector.',
    },
    {
      titulo: 'Automatizaciones',
      descripcion:
        'Tareas repetitivas resueltas con n8n, Python e inteligencia artificial: avisos, informes, respuestas y datos que se mueven solos.',
    },
    {
      titulo: 'Catálogos y cartas digitales',
      descripcion:
        'Catálogo o carta con QR, multiidioma y edición desde el móvil, sin cuotas de plataformas externas.',
    },
  ],
};
