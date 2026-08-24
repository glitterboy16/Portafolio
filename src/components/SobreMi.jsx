import { useState } from 'react';
import Cabecera from './Cabecera';
import IconoTecnologia from './IconoTecnologia';
import { PERFIL } from '../data/perfil';
import { HABILIDADES } from '../data/tecnologias';
import { useRevelar } from '../hooks';

/** Dato suelto en una celda de la rejilla, con su rótulo encima. */
function Dato({ rotulo, children, ancho = false }) {
  return (
    <div className={`bg-vidrio px-4 py-5 ${ancho ? 'col-span-full' : ''}`}>
      <p className="marbete mb-1.5">{rotulo}</p>
      <div className="break-words text-sm">{children}</div>
    </div>
  );
}

export default function SobreMi() {
  const [clicks, setClicks] = useState(0);
  const bloque = useRevelar();
  const rejilla = useRevelar({ retraso: 0.1 });
  const foto = clicks >= 5 ? PERFIL.gif : PERFIL.foto;

  return (
    <section id="sobre-mi" className="scroll-mt-24 py-[clamp(4rem,10vw,8rem)]">
      <Cabecera sobretitulo="Sobre mí" titulo="Estudio de desarrollo de una sola persona." />

      <div ref={bloque} className="grid gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="max-w-[58ch] text-[clamp(1rem,1.8vw,1.15rem)] text-texto-2">
            {PERFIL.presentacion.map((parrafo, i) => (
              <p key={i} className={i > 0 ? 'mt-4' : undefined}>
                {parrafo}
              </p>
            ))}
          </div>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-1 sm:grid-cols-2">
            {PERFIL.servicios.map(({ titulo, descripcion }) => (
              <div key={titulo} className="bg-vidrio p-5">
                <h3 className="mb-1 font-medium tracking-[-0.01em]">{titulo}</h3>
                <p className="text-sm text-texto-2">{descripcion}</p>
              </div>
            ))}
          </div>

          {PERFIL.educacion.map(({ titulo, fecha, descripcion }) => (
            <div key={titulo} className="mt-1 bg-vidrio p-5">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium tracking-[-0.01em]">{titulo}</h3>
                <span className="marbete">{fecha}</span>
              </div>
              <p className="max-w-[58ch] text-sm text-texto-2">{descripcion}</p>
            </div>
          ))}
        </div>

        {/* Ficha personal: el retrato manda y los datos caen debajo en celdas */}
        <aside className="grid gap-1 self-start sm:grid-cols-2 lg:grid-cols-1">
          <figure className="relative col-span-full overflow-hidden border border-borde-fuerte">
            <img
              src={foto}
              alt={PERFIL.nombre}
              width={640}
              height={640}
              onClick={() => setClicks((n) => n + 1)}
              className="aspect-square w-full cursor-pointer object-cover transition-transform duration-700 ease-suave hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-fondo/70 px-4 py-3 backdrop-blur-md">
              <p className="text-sm font-medium">{PERFIL.nombre}</p>
              <p className="text-xs text-texto-2">{PERFIL.cargo}</p>
            </figcaption>
          </figure>

          {PERFIL.contacto.map(({ etiqueta, valor, href, ancho }) => (
            <Dato key={etiqueta} rotulo={etiqueta} ancho={ancho}>
              {href ? (
                <a href={href} className="transition-colors duration-200 ease-suave hover:text-acento">
                  {valor}
                </a>
              ) : (
                valor
              )}
            </Dato>
          ))}
        </aside>
      </div>

      <div ref={rejilla} className="mt-[clamp(2.5rem,5vw,4rem)]">
        <p className="marbete mb-3">Con lo que trabajo</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-1">
          {HABILIDADES.map((clave) => (
            <li key={clave}>
              <IconoTecnologia clave={clave} conEtiqueta celda />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
