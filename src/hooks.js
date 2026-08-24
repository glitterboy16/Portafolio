import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, SplitText, quieto } from './gsap';

const CLAVE_TEMA = 'tema';

/**
 * Tema claro/oscuro. Arranca con lo que el usuario haya elegido antes; si no
 * ha elegido nada, sigue la preferencia del sistema y reacciona si cambia.
 */
export function useTema() {
  const [tema, setTema] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const guardado = localStorage.getItem(CLAVE_TEMA);
    if (guardado === 'light' || guardado === 'dark') return guardado;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  useEffect(() => {
    if (localStorage.getItem(CLAVE_TEMA)) return;
    const consulta = window.matchMedia('(prefers-color-scheme: light)');
    const alCambiar = (e) => setTema(e.matches ? 'light' : 'dark');
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);

  const alternar = useCallback(() => {
    setTema((actual) => {
      const siguiente = actual === 'dark' ? 'light' : 'dark';
      localStorage.setItem(CLAVE_TEMA, siguiente);
      return siguiente;
    });
  }, []);

  return { tema, alternar };
}

/**
 * Scroll con inercia. Lenis interpola la posición en cada cuadro y ScrollTrigger
 * lee esa posición en lugar de la del navegador, así las animaciones ligadas al
 * scroll van sincronizadas con el movimiento suave y no con el salto real.
 */
export function useScrollSuave() {
  const refLenis = useRef(null);

  useEffect(() => {
    if (quieto()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    refLenis.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const avanzar = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(avanzar);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(avanzar);
      lenis.destroy();
      refLenis.current = null;
    };
  }, []);

  /** Lleva la vista a un elemento por id, respetando el alto de la barra. */
  const irA = useCallback((id) => {
    const destino = id === 'portada' ? 0 : document.getElementById(id);
    if (destino === null) return;
    const lenis = refLenis.current;
    if (lenis) lenis.scrollTo(destino, { offset: id === 'portada' ? 0 : -70, duration: 1.2 });
    else if (typeof destino === 'number') window.scrollTo({ top: 0, behavior: 'smooth' });
    else destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const parar = useCallback((detener) => {
    const lenis = refLenis.current;
    if (!lenis) return;
    if (detener) lenis.stop();
    else lenis.start();
  }, []);

  return { irA, parar };
}

/**
 * Marca qué sección ocupa la pantalla, para que la barra sepa dónde estamos.
 */
export function useSeccionVisible(ids) {
  const [activa, setActiva] = useState('portada');

  useLayoutEffect(() => {
    const disparadores = ids.map((id) => {
      const nodo = document.getElementById(id);
      if (!nodo) return null;
      return ScrollTrigger.create({
        trigger: nodo,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: ({ isActive }) => isActive && setActiva(id),
      });
    });

    const arriba = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '+=300',
      onToggle: ({ isActive }) => isActive && setActiva('portada'),
    });

    return () => {
      disparadores.forEach((d) => d?.kill());
      arriba.kill();
    };
  }, [ids]);

  return activa;
}

/**
 * Revela un titular palabra a palabra desde detrás de una máscara. SplitText
 * parte el texto y deja el original accesible para lectores de pantalla.
 */
export function useTitularRevelado(dependencia) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const nodo = ref.current;
    if (!nodo || quieto()) return;

    const contexto = gsap.context(() => {
      const partido = new SplitText(nodo, {
        type: 'lines,words',
        linesClass: 'linea-recorte',
        autoSplit: true,
      });

      gsap.from(partido.words, {
        yPercent: 115,
        duration: 1,
        ease: 'salida',
        stagger: 0.05,
        scrollTrigger: { trigger: nodo, start: 'top 88%' },
      });

      return () => partido.revert();
    }, nodo);

    return () => contexto.revert();
  }, [dependencia]);

  return ref;
}

/** Publica la posición del cursor como --mx/--my para el foco de luz. */
export function useFoco() {
  const ref = useRef(null);

  const alMover = useCallback((e) => {
    const nodo = ref.current;
    if (!nodo) return;
    const caja = nodo.getBoundingClientRect();
    nodo.style.setProperty('--mx', `${e.clientX - caja.left}px`);
    nodo.style.setProperty('--my', `${e.clientY - caja.top}px`);
  }, []);

  return { ref, onMouseMove: alMover };
}

/**
 * Revela un bloque al entrar en pantalla.
 *
 * Se usa `fromTo` y no `from` a propósito: con `from`, si el disparador no
 * llega a activarse —porque el alto del bloque cambió después de medirlo, que
 * es justo lo que pasa cuando dentro hay un iframe que carga tarde— el
 * elemento se queda clavado en su estado inicial, es decir, invisible. Con
 * `fromTo` el destino está declarado, y además se fuerza un recálculo cuando
 * el contenido termina de cargar.
 */
export function useRevelar({ retraso = 0 } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (quieto()) {
      gsap.set(nodo, { opacity: 1, y: 0 });
      return;
    }

    const contexto = gsap.context(() => {
      gsap.fromTo(
        nodo,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: retraso,
          ease: 'salida',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: nodo,
            start: 'top 92%',
            invalidateOnRefresh: true,
          },
        },
      );
    }, nodo);

    // Los iframes de las vistas previas cambian la altura al cargar; sin este
    // recálculo, ScrollTrigger sigue trabajando con las medidas de antes.
    const recalcular = () => ScrollTrigger.refresh();
    const marcos = nodo.querySelectorAll('iframe');
    marcos.forEach((m) => m.addEventListener('load', recalcular));
    const id = setTimeout(recalcular, 400);

    return () => {
      clearTimeout(id);
      marcos.forEach((m) => m.removeEventListener('load', recalcular));
      contexto.revert();
    };
  }, [retraso]);

  return ref;
}
