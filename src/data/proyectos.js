/**
 * Proyectos del portafolio. Todos pesan lo mismo: no hay destacado.
 *
 * Campos:
 *   id          identificador único (kebab-case)
 *   nombre      título visible
 *   categoria   etiqueta corta sobre el título
 *   resumen     qué es y para quién
 *   aportacion  qué puso Angel de su parte
 *   stack       claves de tecnologias.js
 *   web         URL en producción (opcional)
 *   codigo      URL del repositorio (opcional)
 *   anio        año o rango
 *
 * El orden del array es el orden en pantalla.
 */
export const PROYECTOS = [
  {
    id: 'el-bocadito',
    nombre: 'El Bocadito',
    categoria: { es: 'Producto en producción', en: 'Live product' },
    resumen: {
      es: 'Web completa para una taberna de tapas en Lanzarote: carta, reservas e identidad digital, con dominio propio y gestión autónoma por parte del restaurante.',
      en: 'Complete website for a tapas tavern in Lanzarote: menu, bookings and digital identity, on its own domain and fully managed by the restaurant.',
    },
    aportacion: {
      es: 'Diseño y desarrollo íntegro, desde la identidad visual hasta el despliegue y la puesta en marcha del dominio.',
      en: 'End-to-end design and development, from visual identity to deployment and domain setup.',
    },
    stack: ['react', 'tailwind', 'vite', 'supabase'],
    web: 'https://elbocadito.net',
    anio: '2026',
  },
  {
    id: 'pinchos-cana',
    nombre: 'Pinchos Caña',
    categoria: { es: 'Carta digital', en: 'Digital menu' },
    resumen: {
      es: 'Carta digital con QR autogenerado, disponible en español, inglés y portugués, editable desde el móvil por el propio personal.',
      en: 'Digital menu with a self-generated QR code, available in Spanish, English and Portuguese, editable from a phone by the staff themselves.',
    },
    aportacion: {
      es: 'Sistema de edición pensado para el personal de sala: cambiar un precio cuesta lo mismo que mandar un mensaje.',
      en: 'An editing flow built for waitstaff: changing a price takes no more effort than sending a text.',
    },
    stack: ['react', 'vite', 'tailwind', 'supabase'],
    web: 'https://pinchos-cana.vercel.app',
    codigo: 'https://github.com/glitterboy16/pinchos-cana',
    anio: '2026',
  },
  {
    id: 'como-en-casa',
    nombre: 'Como en Casa',
    categoria: { es: 'Carta digital', en: 'Digital menu' },
    resumen: {
      es: 'Carta digital de comida tradicional para el restaurante Como en Casa, pensada para consultarse desde el móvil en la propia mesa.',
      en: 'Digital menu of traditional food for the Como en Casa restaurant, made to be browsed from a phone right at the table.',
    },
    aportacion: {
      es: 'Interfaz de lectura rápida: la carta entera cabe en un pulgar, sin PDF ni descargas.',
      en: 'A fast-reading interface: the whole menu fits under one thumb, with no PDFs or downloads.',
    },
    stack: ['react', 'tailwind', 'supabase'],
    web: 'https://como-en-casa-carta.vercel.app',
    anio: '2026',
  },
];
