import { useEffect, useRef, useState } from 'react';

/** Ancho de escritorio que simulamos dentro del iframe antes de escalarlo. */
const ANCHO_VIRTUAL = 1280;

/**
 * Vista en vivo de la web del proyecto.
 *
 * El iframe sólo se monta cuando la tarjeta entra en pantalla, así la página no
 * carga tres sitios externos de golpe. Se renderiza a 1280px y se escala para
 * que la maqueta se vea como en escritorio, no como en móvil.
 */
export default function VistaPrevia({ url, nombre, proporcion = 16 / 10 }) {
  const contenedor = useRef(null);
  const [visible, setVisible] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [escala, setEscala] = useState(0.25);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    const medir = () => setEscala(nodo.clientWidth / ANCHO_VIRTUAL);
    medir();

    const observador = new ResizeObserver(medir);
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const altoVirtual = ANCHO_VIRTUAL / proporcion;

  return (
    <div
      ref={contenedor}
      style={{ aspectRatio: proporcion }}
      className="relative w-full overflow-hidden rounded-[clamp(0.75rem,1.5vw,1rem)] border border-borde bg-fondo-2 shadow-[0_10px_30px_-14px_var(--c-sombra)]"
    >
      {visible && (
        <iframe
          src={url}
          title={`Vista previa de ${nombre}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setCargado(true)}
          style={{
            width: ANCHO_VIRTUAL,
            height: altoVirtual,
            transform: `scale(${escala})`,
            transformOrigin: 'top left',
          }}
          className={`pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-700 ease-suave ${
            cargado ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Mientras carga: latido sutil en lugar de un hueco vacío */}
      {!cargado && <div className="absolute inset-0 animate-pulse bg-fondo-2" aria-hidden="true" />}

      {/* Velo que atenúa la web y se levanta al pasar el ratón por la tarjeta.
          Va en oscuro y no en el color del fondo: en modo claro, un velo
          blanco lava la captura en lugar de asentarla. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[oklch(0.15_0.01_300/0.18)] transition-opacity duration-500 ease-suave group-hover:opacity-0"
      />
    </div>
  );
}
