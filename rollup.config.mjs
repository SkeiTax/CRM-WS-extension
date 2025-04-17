// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/content.bundle.js',
    format: 'iife',      // Immediately‑Invoked Function Expression
    name: 'ContentScript'
  },
  plugins: [typescript()]
};