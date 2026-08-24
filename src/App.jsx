import { useState } from 'react';
import Aurora from './components/Aurora';
import Navegacion from './components/Navegacion';
import Portada from './components/Portada';
import Brecha from './components/Brecha';
import Pie from './components/Pie';
import BarraLateral from './components/BarraLateral';
import Inicio from './components/Inicio';
import Resumen from './components/Resumen';
import Proyectos from './components/Proyectos';
import Servicios from './components/Servicios';
import { useTema } from './hooks';

/** La portada no aparece en la barra: se llega a ella por el logo. */
const SECCIONES = [
  { id: 'sobre-mi', etiqueta: 'Sobre mí', Componente: Inicio },
  { id: 'resumen', etiqueta: 'Resumen', Componente: Resumen },
  { id: 'proyectos', etiqueta: 'Proyectos', Componente: Proyectos },
  { id: 'servicios', etiqueta: 'Precios', Componente: Servicios },
];

export default function App() {
  const [activa, setActiva] = useState('portada');
  const { tema, alternar } = useTema();
  const seccion = SECCIONES.find((s) => s.id === activa);

  const cambiar = (id) => {
    if (id === activa) return;
    setActiva(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Aurora />

      <Navegacion
        secciones={SECCIONES}
        activa={activa}
        onCambiar={cambiar}
        tema={tema}
        alternar={alternar}
      />

      {activa === 'portada' ? (
        <main key="portada">
          <Portada onIr={cambiar} />
          <div className="mx-auto w-full max-w-[1240px] px-[clamp(0.875rem,2.5vw,2.5rem)]">
            <Brecha />
          </div>
        </main>
      ) : (
        <div className="mx-auto flex min-h-dvh w-full max-w-[1240px] flex-col items-start gap-[clamp(1rem,2.5vw,1.75rem)] px-[clamp(0.875rem,2.5vw,2.5rem)] pb-[clamp(0.875rem,2.5vw,2.5rem)] pt-[clamp(4.5rem,9vw,7rem)] lg:flex-row">
          {/* La ficha personal acompaña a las secciones internas, no a la portada */}
          <BarraLateral />

          <main key={activa} className="w-full min-w-0 flex-1">
            <seccion.Componente />
          </main>
        </div>
      )}

      <Pie onIr={cambiar} secciones={SECCIONES} />
    </>
  );
}
