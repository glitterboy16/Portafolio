import Cabecera from './Cabecera';
import IconoTecnologia from './IconoTecnologia';
import CarruselTecnologias from './CarruselTecnologias';
import Retrato from './Retrato';
import { PERFIL } from '../data/perfil';
import { HABILIDADES } from '../data/tecnologias';
import { useRevelar } from '../hooks';
import { useIdioma } from '../idioma';

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
  const bloque = useRevelar();
  const rejilla = useRevelar({ retraso: 0.1 });
  const { t } = useIdioma();

  return (
    <section id="sobre-mi" className="scroll-mt-24 py-[clamp(3rem,6vw,5rem)]">
      <Cabecera
        sobretitulo={t({ es: 'Sobre mí', en: 'About me' })}
        titulo={t({ es: 'Desarrollador freelance.', en: 'Freelance developer.' })}
      />

      <div ref={bloque} className="grid gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="max-w-[58ch] text-[clamp(1rem,1.8vw,1.15rem)] text-texto-2">
            {PERFIL.presentacion.map((parrafo, i) => (
              <p key={i} className={i > 0 ? 'mt-4' : undefined}>
                {t(parrafo)}
              </p>
            ))}
          </div>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-1 sm:grid-cols-2">
            {PERFIL.servicios.map(({ titulo, descripcion }, i) => (
              <div
                key={i}
                className={`bg-vidrio p-5 ${i === PERFIL.servicios.length - 1 && PERFIL.servicios.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}
              >
                <h3 className="mb-1 font-medium tracking-[-0.01em]">{t(titulo)}</h3>
                <p className="text-sm text-texto-2">{t(descripcion)}</p>
              </div>
            ))}
          </div>

          {[...PERFIL.experiencia, ...PERFIL.educacion].map(({ titulo, fecha, descripcion, href }, i) => (
            <div key={i} className="mt-1 bg-vidrio p-5">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium tracking-[-0.01em]">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 transition-colors duration-200 ease-suave hover:text-acento hover:underline"
                    >
                      {t(titulo)}
                    </a>
                  ) : (
                    t(titulo)
                  )}
                </h3>
                <span className="marbete">{t(fecha)}</span>
              </div>
              <p className="max-w-[58ch] text-sm text-texto-2">{t(descripcion)}</p>
            </div>
          ))}
        </div>

        {/* Ficha personal: el retrato manda y los datos caen debajo en celdas */}
        <aside className="grid gap-1 self-start sm:grid-cols-2 lg:grid-cols-1">
          <Retrato />

          {PERFIL.contacto.map(({ etiqueta, valor, href, ancho }, i) => (
            <Dato key={i} rotulo={t(etiqueta)} ancho={ancho}>
              {href ? (
                <a href={href} className="transition-colors duration-200 ease-suave hover:text-acento">
                  {t(valor)}
                </a>
              ) : (
                t(valor)
              )}
            </Dato>
          ))}
        </aside>
      </div>

      <div ref={rejilla} className="mt-[clamp(2.5rem,5vw,4rem)]">
        <p className="marbete mb-3">{t({ es: 'Con lo que trabajo', en: 'What I work with' })}</p>

        {/* En pantallas estrechas la rejilla alargaba muchísimo la página, así
            que el mismo contenido desfila en una sola tira. */}
        <div className="sm:hidden">
          <CarruselTecnologias claves={HABILIDADES} />
        </div>

        <ul className="hidden grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-1 sm:grid">
          {HABILIDADES.map((clave) => (
            <li key={clave}>
              <IconoTecnologia clave={clave} tamano={38} conEtiqueta celda />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
