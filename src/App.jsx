import { useState } from 'react';
import Aurora from './components/Aurora';
import BarraLateral from './components/BarraLateral';
import Navegacion from './components/Navegacion';
import Inicio from './components/Inicio';
import Resumen from './components/Resumen';
import Proyectos from './components/Proyectos';
import { useTema } from './hooks';

const SECCIONES = [
  { id: 'inicio', etiqueta: 'Inicio', Componente: Inicio },
  { id: 'resumen', etiqueta: 'Resumen', Componente: Resumen },
  { id: 'proyectos', etiqueta: 'Proyectos', Componente: Proyectos },
];

export default function App() {
  const [activa, setActiva] = useState('inicio');
  const { tema, alternar } = useTema();
  const { Componente } = SECCIONES.find((s) => s.id === activa);

  const cambiar = (id) => {
    if (id === activa) return;
    setActiva(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Aurora />

      <div className="mx-auto flex min-h-dvh w-full max-w-[1240px] flex-col items-start gap-[clamp(1rem,2.5vw,1.75rem)] p-[clamp(0.875rem,2.5vw,2.5rem)] lg:flex-row">
        <BarraLateral tema={tema} alternar={alternar} />

        <main className="w-full min-w-0 flex-1">
          <Navegacion secciones={SECCIONES} activa={activa} onCambiar={cambiar} />

          {/* La clave remonta la sección para que las entradas se reinicien */}
          <div key={activa}>
            <Componente />
          </div>

          <footer className="mt-[clamp(3rem,6vw,5rem)] border-t border-borde pt-6 text-xs text-texto-3">
            <p>Diseñado y construido por Angel Villorina · Mérida, España</p>
          </footer>
        </main>
      </div>
    </>
  );
}
