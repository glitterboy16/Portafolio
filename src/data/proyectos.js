/**
 * Proyectos del portafolio.
 *
 * Campos:
 *   id          identificador único (kebab-case)
 *   nombre      título visible
 *   categoria   etiqueta corta sobre el título
 *   resumen     una o dos frases: qué es y para quién
 *   aportacion  qué construiste tú (opcional, se muestra en el destacado)
 *   stack       claves de tecnologias.js
 *   web         URL en producción (opcional)
 *   codigo      URL del repositorio (opcional)
 *   anio        año o rango
 *   destacado   true = ocupa la tarjeta grande de apertura
 *
 * El orden del array es el orden en pantalla.
 */
export const PROYECTOS = [
  {
    id: 'el-bocadito',
    nombre: 'El Bocadito',
    categoria: 'Producto en producción',
    resumen:
      'Web completa para una taberna de tapas en Lanzarote: carta, reservas e identidad digital, con dominio propio y gestión autónoma por parte del restaurante.',
    aportacion:
      'Diseño y desarrollo íntegro, desde la identidad visual hasta el despliegue y la puesta en marcha del dominio.',
    stack: ['react', 'tailwind', 'vite', 'supabase'],
    web: 'https://elbocadito.net',
    anio: '2026',
    destacado: true,
  },
  {
    id: 'pinchos-cana',
    nombre: 'Pinchos Caña',
    categoria: 'Carta digital',
    resumen:
      'Carta digital con QR autogenerado, disponible en español, inglés y portugués, editable desde el móvil por el propio personal.',
    stack: ['react', 'vite', 'tailwind', 'supabase'],
    web: 'https://pinchos-cana.vercel.app',
    codigo: 'https://github.com/glitterboy16/pinchos-cana',
    anio: '2026',
  },
  {
    id: 'como-en-casa',
    nombre: 'Como en Casa',
    categoria: 'Carta digital',
    resumen:
      'Carta digital de comida tradicional para el restaurante Como en Casa, pensada para consultarse desde el móvil en la propia mesa.',
    stack: ['react', 'tailwind', 'supabase'],
    web: 'https://como-en-casa-carta.vercel.app',
    anio: '2026',
  },
];
