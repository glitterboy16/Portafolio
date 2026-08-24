import { siGithub, siInstagram, siGmail } from 'simple-icons';
import linkedin from 'devicon/icons/linkedin/linkedin-original.svg?raw';

/**
 * Redes y formas de contacto, con su marca.
 *
 * LinkedIn ya no está en simple-icons, así que viene de devicon; los demás
 * traen su trazado y su color oficial de simple-icons.
 */
export const REDES = [
  {
    nombre: 'GitHub',
    href: 'https://github.com/glitterboy16',
    path: siGithub.path,
    color: `#${siGithub.hex}`,
  },
  {
    nombre: 'LinkedIn',
    // Pendiente de que Angel pase su perfil
    href: null,
    svg: linkedin,
    color: '#0A66C2',
  },
  {
    nombre: 'Instagram',
    href: 'https://www.instagram.com/glitterboy.vc?igsh=YmNoajE5ZTV5b3hv&utm_source=qr',
    path: siInstagram.path,
    color: `#${siInstagram.hex}`,
  },
  {
    nombre: 'Gmail',
    href: 'mailto:villorinaangelandres@gmail.com',
    path: siGmail.path,
    color: `#${siGmail.hex}`,
  },
];
