// Los archivos de public/ se piden a través de BASE_URL: en Vercel la base es
// "/" y en GitHub Pages "/Portafolio/", y una ruta absoluta fallaría allí.
const publico = (archivo) => `${import.meta.env.BASE_URL}${archivo}`;

/**
 * Todo texto visible va en los dos idiomas como { es, en }; el helper `t`
 * del contexto de idioma elige el que toca.
 */
export const PERFIL = {
  nombre: 'Angel Villorina',
  cargo: { es: 'Desarrollador de Aplicaciones Web', en: 'Web Application Developer' },
  /**
   * Rotan en el retrato, una detrás de otra con su pausa. Si alguna todavía
   * no está en public/, el componente la descarta y sigue con las demás.
   *
   * `encuadre` es el punto por el que se recorta al cuadrado. Las fotos de
   * grupo llevan las caras en el tercio superior, así que centrarlas dejaría
   * el recorte a la altura de las corbatas.
   */
  fotos: [
    { src: publico('perfil-1.jpg'), encuadre: 'center 32%' },
    { src: publico('perfil-2.jpg'), encuadre: 'center 22%' },
    { src: publico('perfil-3.jpg'), encuadre: 'center 40%' },
  ],
  fotoRespaldo: publico('yo.jpg'),
  gif: publico('Gabino-gif.gif'),

  presentacion: [
    {
      es: 'Soy estudiante de Desarrollo de Aplicaciones Web. Trabajo en el desarrollo y la resolución de problemas tecnológicos, convirtiendo problemas complejos en soluciones simples.',
      en: 'I study Web Application Development. I build software and solve technology problems, turning complex problems into simple solutions.',
    },
    {
      es: 'Construyo productos reales para pymes y profesionales de cualquier sector: webs, aplicaciones y automatizaciones que sus dueños pueden gestionar solos, sin depender de nadie.',
      en: 'I build real products for small businesses and professionals in any sector: websites, applications and automations their owners can manage on their own, without depending on anyone.',
    },
  ],

  contacto: [
    {
      etiqueta: { es: 'Email', en: 'Email' },
      valor: 'villorinaangelandres@gmail.com',
      href: 'mailto:villorinaangelandres@gmail.com',
      // El más largo: en rejilla horizontal ocupa toda la fila para no partirse
      ancho: true,
    },
    {
      etiqueta: { es: 'Teléfono', en: 'Phone' },
      valor: '+34 641 565 926',
      href: 'tel:+34641565926',
    },
    {
      etiqueta: { es: 'Cumpleaños', en: 'Birthday' },
      valor: { es: '16 de septiembre, 2003', en: 'September 16, 2003' },
    },
    {
      etiqueta: { es: 'Ubicación', en: 'Location' },
      valor: { es: 'Mérida, España', en: 'Mérida, Spain' },
    },
  ],

  redes: [
    { nombre: 'GitHub', href: 'https://github.com/glitterboy16' },
    { nombre: 'Instagram', href: 'https://www.instagram.com/glitterboy.vc?igsh=YmNoajE5ZTV5b3hv&utm_source=qr' },
  ],

  educacion: [
    {
      titulo: { es: 'Desarrollo de Aplicaciones Web', en: 'Web Application Development' },
      fecha: { es: '2024 — Presente', en: '2024 — Present' },
      descripcion: {
        es: 'Estudiando desarrollo de aplicaciones web en el IES Albarregas con HTML, CSS, JavaScript y Java, además de otras tecnologías.',
        en: 'Studying web application development at IES Albarregas with HTML, CSS, JavaScript and Java, among other technologies.',
      },
    },
  ],

  experiencia: [
    {
      titulo: { es: 'Prácticas en Veyve Technology', en: 'Internship at Veyve Technology' },
      // El enlace queda pendiente de que Angel confirme cuál es el bueno
      fecha: '2025 — 2026',
      descripcion: {
        es: 'Participación en proyectos reales del equipo durante el periodo de prácticas, trabajando sobre el mismo código y los mismos plazos que el resto de desarrolladores.',
        en: 'Worked on the team’s real projects during the internship period, on the same codebase and deadlines as the rest of the developers.',
      },
    },
  ],

  servicios: [
    {
      titulo: { es: 'Desarrollo de páginas y aplicaciones web', en: 'Websites and web applications' },
      descripcion: {
        es: 'Sitios y aplicaciones a medida con React, Tailwind y JavaScript, del diseño al despliegue, para cualquier sector.',
        en: 'Custom sites and applications with React, Tailwind and JavaScript, from design to deployment, for any sector.',
      },
    },
    {
      titulo: { es: 'Automatizaciones', en: 'Automations' },
      descripcion: {
        es: 'Tareas repetitivas resueltas con n8n, Python e inteligencia artificial: avisos, informes, respuestas y datos que se mueven solos.',
        en: 'Repetitive work solved with n8n, Python and AI: alerts, reports, replies and data that moves on its own.',
      },
    },
    {
      titulo: { es: 'Catálogos y cartas digitales', en: 'Digital catalogues and menus' },
      descripcion: {
        es: 'Catálogo o carta con QR, multiidioma y edición desde el móvil, sin cuotas de plataformas externas.',
        en: 'QR catalogue or menu, multilingual and editable from a phone, with no third-party platform fees.',
      },
    },
  ],
};
