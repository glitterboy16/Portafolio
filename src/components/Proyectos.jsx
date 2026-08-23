import Cabecera from './Cabecera';
import TarjetaProyecto from './TarjetaProyecto';
import { PROYECTOS } from '../data/proyectos';

export default function Proyectos() {
  return (
    <article>
      <Cabecera sobretitulo="Trabajo seleccionado" titulo="Proyectos." />

      {PROYECTOS.length === 0 ? (
        <div className="max-w-[640px] rounded-2xl border border-dashed border-borde-fuerte p-6 text-sm text-texto-2">
          <p className="mb-1 font-semibold text-texto">Aún no hay proyectos publicados</p>
          <p>Los próximos trabajos aparecerán aquí.</p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {PROYECTOS.map((proyecto, i) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} indice={i} />
          ))}
        </ul>
      )}
    </article>
  );
}
