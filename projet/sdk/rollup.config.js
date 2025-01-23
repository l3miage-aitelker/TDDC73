import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js', // Point d'entrée
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx'],  // ⚠️ Extensions ajoutées
    }),
    alias({
      entries: [
        { find: 'react', replacement: path.resolve(__dirname, '../tddc73-register/node_modules/react') },
        { find: 'react-dom', replacement: path.resolve(__dirname, '../tddc73-register/node_modules/react-dom') }
      ]
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx'],  // ⚠️ Babel doit gérer JSX
    }),
    terser(),
    postcss(),
  ],
  external: ['react', 'react-dom'],  // Exclure React du bundle

};
