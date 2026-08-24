/**
 * Catálogo de tecnologías.
 *
 * Hay tres maneras de traer un icono, por orden de preferencia:
 *   svg   — archivo de devicon en crudo, a todo color (lo habitual)
 *   path  — trazado de simple-icons, monocromo, con su color de marca al lado
 *   sigla — para lo que no está en ninguna librería, un monograma tipográfico
 *
 * Para añadir una tecnología, impórtala arriba y añádela abajo.
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
import python from 'devicon/icons/python/python-original.svg?raw';
import vscode from 'devicon/icons/vscode/vscode-original.svg?raw';

import { siN8n, siClaude } from 'simple-icons';

const deSimple = (icono, nombre = icono.title) => ({
  nombre,
  path: icono.path,
  color: `#${icono.hex}`,
});

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
  python: { nombre: 'Python', svg: python },
  vscode: { nombre: 'VS Code', svg: vscode },
  n8n: deSimple(siN8n),
  claude: deSimple(siClaude),
  // Antigravity es demasiado reciente para estar en devicon o simple-icons;
  // hasta que Angel pase el SVG oficial, va con monograma.
  antigravity: { nombre: 'Antigravity', sigla: 'Ag', color: '#4285F4' },
};

/** Orden en que aparecen en la sección de habilidades. */
export const HABILIDADES = [
  'html',
  'css',
  'javascript',
  'react',
  'tailwind',
  'vite',
  'node',
  'supabase',
  'python',
  'java',
  'bootstrap',
  'n8n',
  'claude',
  'figma',
  'vscode',
  'antigravity',
  'git',
  'bash',
];
