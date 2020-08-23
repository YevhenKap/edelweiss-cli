import url from '@rollup/plugin-url';
import dev from 'rollup-plugin-dev';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'public/build/index.js',
    format: 'cjs',
    plugins: [terser()],
  },
  plugins: [
    cleaner({
      targets: ['public/build/'],
    }),
    url(),
    postcss({
      plugins: [],
      extract: true,
      minimize: true,
    }),
    nodeResolve({ browser: true }),
    dev({
      dirs: ['public'],
      spa: 'public/index.html',
      port: 3000,
    }),
  ],
};
