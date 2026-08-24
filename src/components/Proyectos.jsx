import Cabecera from './Cabecera';
import TarjetaProyecto from './TarjetaProyecto';
import { PROYECTOS } from '../data/proyectos';

export default function Proyectos() {
  return (
    <article>
      <Cabecera sobretitulo="Trabajo seleccionado" titulo="Proyectos." />

      {PROYECTOS.length === 0 ? (
        <div className="max-w-[42rem] rounded-[clamp(1rem,2vw,1.5rem)] border border-dashed border-borde-fuerte p-6 text-sm text-texto-2">
          <p className="mb-1 font-semibold text-texto">Aún no hay proyectos publicados</p>
          <p>Los próximos trabajos aparecerán aquí.</p>
        </div>
      ) : (
        <ul className="grid gap-[clamp(1rem,2.5vw,1.5rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr))]">
          {PROYECTOS.map((proyecto, i) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} indice={i} />
          ))}
        </ul>
      )}
    </article>
  );
}
