import { useEffect, useRef, useState } from 'react';
import { PERFIL } from '../data/perfil';
import { useIdioma } from '../idioma';

const PAUSA = 4200; // lo que se queda quieta cada foto
const CRUCE = 900; // lo que dura el paso de una a otra

/**
 * Retrato con varias fotos que se van turnando.
 *
 * No es un carrusel que desliza: cada foto se queda su rato y luego cruza con
 * la siguiente por fundido, que es lo que hace que se lea como un retrato y no
 * como una galería. Las dos capas están siempre montadas y sólo cambia cuál
 * está visible, así el cruce no depende de que la siguiente cargue a tiempo.
 *
 * Una foto que no exista se descarta al fallar su carga, de modo que el turno
 * sigue funcionando aunque falte alguna por subir.
 *
 * A los cinco toques aparece el gif de Gabino y el turno se detiene.
 */
export default function Retrato({ className = '' }) {
  const [disponibles, setDisponibles] = useState(PERFIL.fotos);
  const [indice, setIndice] = useState(0);
  const [clicks, setClicks] = useState(0);
  const temporizador = useRef(null);
  const { t } = useIdioma();

  const esGabino = clicks >= 5;
  const lista =
    disponibles.length > 0 ? disponibles : [{ src: PERFIL.fotoRespaldo, encuadre: 'center' }];

  useEffect(() => {
    if (esGabino || lista.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    temporizador.current = setInterval(() => {
      setIndice((i) => (i + 1) % lista.length);
    }, PAUSA + CRUCE);

    return () => clearInterval(temporizador.current);
  }, [esGabino, lista.length]);

  const descartar = (src) =>
    setDisponibles((actuales) => {
      const quedan = actuales.filter((f) => f.src !== src);
      setIndice(0);
      return quedan;
    });

  return (
    <figure
      className={`relative col-span-full overflow-hidden border border-borde-fuerte ${className}`}
    >
      <div
        onClick={() => setClicks((n) => n + 1)}
        className="relative aspect-square w-full cursor-pointer"
      >
        {esGabino ? (
          <img
            src={PERFIL.gif}
            alt={PERFIL.nombre}
            className="size-full object-cover transition-transform duration-700 ease-suave hover:scale-[1.03]"
          />
        ) : (
          lista.map(({ src, encuadre }, i) => (
            <img
              key={src}
              src={src}
              alt={i === indice ? PERFIL.nombre : ''}
              aria-hidden={i !== indice}
              onError={() => descartar(src)}
              style={{ transitionDuration: `${CRUCE}ms`, objectPosition: encuadre }}
              className={`absolute inset-0 size-full object-cover transition-opacity ease-suave ${
                i === indice ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        )}
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-fondo/70 px-4 py-3 backdrop-blur-md">
        <p className="text-sm font-medium">{PERFIL.nombre}</p>
        <p className="text-xs text-texto-2">{t(PERFIL.cargo)}</p>
      </figcaption>

      {/* Marcas de posición: dicen cuántas fotos hay y en cuál vamos */}
      {!esGabino && lista.length > 1 && (
        <div className="pointer-events-none absolute right-3 top-3 flex gap-1.5">
          {lista.map(({ src }, i) => (
            <span
              key={src}
              className={`h-1 rounded-full bg-white transition-all duration-500 ease-suave ${
                i === indice ? 'w-4 opacity-90' : 'w-1 opacity-45'
              }`}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
