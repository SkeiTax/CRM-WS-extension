// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'ContentScript',
    globals: {
      vue: 'Vue',
    },
  },
  plugins: [
    resolve({
      extensions: ['.js', '.ts', '.vue', '.css']
    }),

    // 👉 ОБЯЗАТЕЛЬНО ДО commonjs()
    vue({
      preprocessStyles: true,
      target: 'browser',
      include: /\.vue$/,
      defaultLang: {
        script: 'ts'
      }
    }),

    // 👉 CSS тоже до commonjs
    css({ output: 'style.css' }),

    // 👉 ПОТОМ typescript
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false,
      declaration: false
    }),

    // 👉 ПОТОМ commonjs, но исключим обработку vue?*
    commonjs({
      exclude: [
        '**/*.vue',
        '**/*.vue?*'
      ]
    }),

    copy({
      targets: [
        { src: 'node_modules/vue/dist/vue.global.prod.js', dest: 'dist' },
        { src: 'manifest.json', dest: 'dist' },
        { src: 'update-*.*', dest: 'dist' },
      ]
    }),
  ],
  external: ['vue'],
}
