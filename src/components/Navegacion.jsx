import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Segmented control con píldora que se desliza hacia la pestaña activa.
 */
export default function Navegacion({ secciones, activa, onCambiar }) {
  const contenedor = useRef(null);
  const botones = useRef({});
  const [pildora, setPildora] = useState({ left: 0, width: 0 });
  const [lista, setLista] = useState(false);

  useLayoutEffect(() => {
    const colocar = () => {
      const boton = botones.current[activa];
      if (!boton) return;
      setPildora({ left: boton.offsetLeft, width: boton.offsetWidth });
    };

    colocar();
    const id = requestAnimationFrame(() => setLista(true));
    window.addEventListener('resize', colocar);
    document.fonts?.ready.then(colocar);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', colocar);
    };
  }, [activa]);

  return (
    <nav className="animate-aparecer sticky top-3 z-20 mb-10 lg:top-[clamp(1rem,3vw,2.5rem)] lg:mb-12">
      <ul
        ref={contenedor}
        className="relative flex w-full gap-1 rounded-full border border-borde bg-superficie/75 p-1 shadow-[0_4px_24px_oklch(0_0_0/0.25)] backdrop-blur-xl backdrop-saturate-150 sm:inline-flex sm:w-auto"
      >
        <li
          aria-hidden="true"
          style={{ transform: `translateX(${pildora.left}px)`, width: pildora.width }}
          className={`absolute inset-y-1 left-0 rounded-full border border-borde bg-white/10 ${
            lista ? 'opacity-100 transition-[transform,width,opacity] duration-300 ease-suave' : 'opacity-0'
          }`}
        />
        {secciones.map(({ id, etiqueta }) => (
          <li key={id} className="min-w-0 flex-1 sm:flex-none">
            <button
              ref={(el) => (botones.current[id] = el)}
              onClick={() => onCambiar(id)}
              aria-current={activa === id ? 'page' : undefined}
              className={`relative z-10 w-full rounded-full px-2 py-2 text-[0.8125rem] font-semibold tracking-wide transition-colors duration-300 ease-suave active:scale-96 sm:px-5.5 sm:text-sm ${
                activa === id ? 'text-texto' : 'text-texto-2 hover:text-texto'
              }`}
            >
              {etiqueta}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
