// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',      // Immediately‑Invoked Function Expression
    name: 'ContentScript',
  },
  plugins: [
    resolve(),     // ищет зависимости в node_modules
    commonjs(),    // преобразует commonjs-модули в ES-модули
    typescript(),
    copy({
      targets: [
        { src: 'manifest.json', dest: 'dist' },
        { src: 'resources/*', dest: 'dist/resources' },
        { src: 'update-*.*', dest: 'dist' }
      ]
    })
  ],
};