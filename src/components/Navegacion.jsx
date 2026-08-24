import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Segmented control con píldora deslizante. La píldora se mide sobre el botón
 * activo real, así que sigue cuadrando aunque cambien los textos o la fuente.
 */
export default function Navegacion({ secciones, activa, onCambiar }) {
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
    <nav className="animate-aparecer sticky top-[clamp(0.5rem,2vw,1.5rem)] z-30 mb-[clamp(2rem,5vw,3.5rem)]">
      <ul className="vidrio relative flex w-full gap-1 rounded-full p-1 sm:inline-flex sm:w-auto">
        <li
          aria-hidden="true"
          style={{ transform: `translateX(${pildora.left}px)`, width: pildora.width }}
          className={`absolute inset-y-1 left-0 rounded-full bg-acento shadow-[0_6px_20px_-6px_var(--c-acento)] ${
            lista
              ? 'opacity-100 transition-[transform,width,opacity] duration-500 ease-entrada'
              : 'opacity-0'
          }`}
        />
        {secciones.map(({ id, etiqueta }) => (
          <li key={id} className="min-w-0 flex-1 sm:flex-none">
            <button
              ref={(el) => (botones.current[id] = el)}
              onClick={() => onCambiar(id)}
              aria-current={activa === id ? 'page' : undefined}
              className={`relative z-10 w-full rounded-full px-2 py-2 text-[clamp(0.8125rem,1.6vw,0.875rem)] font-semibold tracking-wide transition-colors duration-300 ease-suave active:scale-95 sm:px-6 ${
                activa === id ? 'text-fondo' : 'text-texto-2 hover:text-texto'
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
