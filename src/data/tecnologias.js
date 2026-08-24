/**
 * Catálogo de tecnologías.
 *
 * Los iconos son los SVG oficiales de devicon, importados en crudo para que
 * conserven sus colores reales (el degradado de Vite, la taza azul de Java).
 * En reposo se muestran en gris mediante un filtro CSS.
 *
 * Para añadir una tecnología: importa su SVG de devicon y añádela abajo.
 * Los archivos están en node_modules/devicon/icons/<nombre>/.
 */
import html from 'devicon/icons/html5/html5-original.svg?raw';
import css from 'devicon/icons/css3/css3-original.svg?raw';
import javascript from 'devicon/icons/javascript/javascript-original.svg?raw';
import react from 'devicon/icons/react/react-original.svg?raw';
import tailwind from 'devicon/icons/tailwindcss/tailwindcss-original.svg?raw';
import vite from 'devicon/icons/vitejs/vitejs-original.svg?raw';
import supabase from 'devicon/icons/supabase/supabase-original.svg?raw';
import bootstrap from 'devicon/icons/bootstrap/bootstrap-original.svg?raw';
import java from 'devicon/icons/java/java-original.svg?raw';
import figma from 'devicon/icons/figma/figma-original.svg?raw';
import bash from 'devicon/icons/bash/bash-original.svg?raw';
import git from 'devicon/icons/git/git-original.svg?raw';
import node from 'devicon/icons/nodejs/nodejs-original.svg?raw';

export const TECNOLOGIAS = {
  html: { nombre: 'HTML', svg: html },
  css: { nombre: 'CSS', svg: css },
  javascript: { nombre: 'JavaScript', svg: javascript },
  react: { nombre: 'React', svg: react },
  tailwind: { nombre: 'Tailwind CSS', svg: tailwind },
  vite: { nombre: 'Vite', svg: vite },
  supabase: { nombre: 'Supabase', svg: supabase },
  bootstrap: { nombre: 'Bootstrap', svg: bootstrap },
  java: { nombre: 'Java', svg: java },
  figma: { nombre: 'Figma', svg: figma },
  bash: { nombre: 'Bash', svg: bash },
  git: { nombre: 'Git', svg: git },
  node: { nombre: 'Node.js', svg: node },
};

/** Orden en que aparecen en la sección Habilidades. */
export const HABILIDADES = [
  'html',
  'css',
  'javascript',
  'react',
  'tailwind',
  'vite',
  'supabase',
  'java',
  'bootstrap',
  'figma',
  'git',
  'bash',
];
