import Cabecera from './Cabecera';
import TarjetaProyecto from './TarjetaProyecto';
import { PROYECTOS } from '../data/proyectos';
import { useIdioma } from '../idioma';

export default function Proyectos() {
  const { t } = useIdioma();

  return (
    <section id="proyectos" className="scroll-mt-24 py-[clamp(3rem,6vw,5rem)]">
      <Cabecera
        sobretitulo={t({ es: 'Trabajo seleccionado', en: 'Selected work' })}
        titulo={t({ es: 'Webs que ya están funcionando.', en: 'Websites already up and running.' })}
      />

      {PROYECTOS.length === 0 ? (
        <div className="max-w-[42rem] rounded-[clamp(1rem,2vw,1.5rem)] border border-dashed border-borde-fuerte p-6 text-sm text-texto-2">
          <p className="mb-1 font-semibold text-texto">
            {t({ es: 'Aún no hay proyectos publicados', en: 'No projects published yet' })}
          </p>
          <p>{t({ es: 'Los próximos trabajos aparecerán aquí.', en: 'Upcoming work will show up here.' })}</p>
        </div>
      ) : (
        <ul className="grid gap-[clamp(1rem,2.5vw,1.5rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr))]">
          {PROYECTOS.map((proyecto, i) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} indice={i} />
          ))}
        </ul>
      )}
    </section>
  );
}
