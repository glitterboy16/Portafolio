/**
 * Planes de servicio.
 *
 * `desde` y `hasta` son dólares. El signo "+" del plan premium se marca con
 * `abierto`, para no meter el símbolo dentro del número.
 */
export const PLANES = [
  {
    id: 'basica',
    nombre: 'Básica',
    resumen: 'Una web sencilla para estar presente en internet cuanto antes.',
    desde: 50,
    hasta: 150,
    entrega: '3 — 5 días',
    incluye: [
      'Diseño sencillo sobre plantilla',
      'Pocas secciones, una sola página',
      'Formulario de contacto básico',
      'Adaptada a móvil',
      'Publicación y dominio conectado',
    ],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    resumen: 'Diseño hecho a medida para un negocio que ya sabe lo que quiere.',
    desde: 150,
    hasta: 400,
    entrega: '1 — 2 semanas',
    recomendado: true,
    incluye: [
      'Diseño personalizado, sin plantillas',
      'Varias secciones y navegación propia',
      'Formulario y botón de WhatsApp',
      'Animaciones y transiciones cuidadas',
      'Responsive real en todos los tamaños',
      'Publicación y puesta en marcha',
    ],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    resumen: 'Pensada para convertir visitas en clientes, no solo para verse bien.',
    desde: 400,
    hasta: 800,
    abierto: true,
    entrega: '2 — 4 semanas',
    incluye: [
      'UX/UI trabajado y textos de venta',
      'Optimización orientada a conversión',
      'Integraciones a medida y automatizaciones',
      'Analítica y medición de resultados',
      'Animaciones e interacciones avanzadas',
      'Acompañamiento tras la publicación',
    ],
  },
];

export const NOTA_PRECIOS =
  'Precios orientativos en dólares. El presupuesto final depende del alcance: te lo confirmo por escrito antes de empezar y no se paga nada hasta entonces.';
