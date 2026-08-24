/**
 * Planes de servicio.
 *
 * `desde` y `hasta` son dólares. El signo "+" del plan premium se marca con
 * `abierto`, para no meter el símbolo dentro del número.
 */
export const PLANES = [
  {
    id: 'basica',
    nombre: { es: 'Básica', en: 'Basic' },
    resumen: {
      es: 'Una web sencilla para estar presente en internet cuanto antes.',
      en: 'A simple website to get online as soon as possible.',
    },
    desde: 50,
    hasta: 150,
    entrega: { es: '3 — 5 días', en: '3 — 5 days' },
    incluye: [
      { es: 'Diseño sencillo sobre plantilla', en: 'Simple template-based design' },
      { es: 'Pocas secciones, una sola página', en: 'A few sections, single page' },
      { es: 'Formulario de contacto básico', en: 'Basic contact form' },
      { es: 'Adaptada a móvil', en: 'Mobile-friendly' },
      { es: 'Publicación y dominio conectado', en: 'Publishing and domain setup' },
    ],
  },
  {
    id: 'profesional',
    nombre: { es: 'Profesional', en: 'Professional' },
    resumen: {
      es: 'Diseño hecho a medida para un negocio que ya sabe lo que quiere.',
      en: 'Custom design for a business that knows what it wants.',
    },
    desde: 150,
    hasta: 400,
    entrega: { es: '1 — 2 semanas', en: '1 — 2 weeks' },
    recomendado: true,
    incluye: [
      { es: 'Diseño personalizado, sin plantillas', en: 'Custom design, no templates' },
      { es: 'Varias secciones y navegación propia', en: 'Multiple sections and real navigation' },
      { es: 'Formulario y botón de WhatsApp', en: 'Contact form and WhatsApp button' },
      { es: 'Animaciones y transiciones cuidadas', en: 'Polished animations and transitions' },
      { es: 'Responsive real en todos los tamaños', en: 'Truly responsive at every size' },
      { es: 'Publicación y puesta en marcha', en: 'Publishing and launch' },
    ],
  },
  {
    id: 'premium',
    nombre: { es: 'Premium', en: 'Premium' },
    resumen: {
      es: 'Pensada para convertir visitas en clientes, no solo para verse bien.',
      en: 'Built to turn visits into customers, not just to look good.',
    },
    desde: 400,
    hasta: 800,
    abierto: true,
    entrega: { es: '2 — 4 semanas', en: '2 — 4 weeks' },
    incluye: [
      { es: 'UX/UI trabajado y textos de venta', en: 'Refined UX/UI and sales copy' },
      { es: 'Optimización orientada a conversión', en: 'Conversion-focused optimisation' },
      { es: 'Integraciones a medida y automatizaciones', en: 'Custom integrations and automations' },
      { es: 'Analítica y medición de resultados', en: 'Analytics and results tracking' },
      { es: 'Animaciones e interacciones avanzadas', en: 'Advanced animations and interactions' },
      { es: 'Acompañamiento tras la publicación', en: 'Support after launch' },
    ],
  },
];

export const NOTA_PRECIOS = {
  es: 'Precios orientativos en dólares. El presupuesto final depende del alcance: te lo confirmo por escrito antes de empezar y no se paga nada hasta entonces.',
  en: 'Guide prices in US dollars. The final quote depends on scope: I confirm it in writing before starting, and nothing is paid until then.',
};
