// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/content.bundle.js',
    format: 'iife',      // Immediately‑Invoked Function Expression
    name: 'ContentScript',
  },
  plugins: [
    resolve(),     // ищет зависимости в node_modules
    commonjs(),    // преобразует commonjs-модули в ES-модули
    typescript()
  ],
};