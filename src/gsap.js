import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip);

/**
 * Curvas propias. `salida` arranca de golpe y frena largo, que es lo que da
 * la sensación de que el movimiento pesa; `entrada` es su reverso suave.
 */
CustomEase.create('salida', '0.16, 1, 0.3, 1');
CustomEase.create('entrada', '0.7, 0, 0.84, 0');
CustomEase.create('vaiven', '0.65, 0, 0.35, 1');

/** ¿El sistema pide que nos estemos quietos? */
export const quieto = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText, CustomEase, Flip };
