import url from '@rollup/plugin-url';
import dev from 'rollup-plugin-dev';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const PUBLIC_DIR_NAME = 'public';
const BIULD_DIR_NAME = 'build';

export default {
  input: 'src/index.ts',
  output: {
    file: `${PUBLIC_DIR_NAME}/${BIULD_DIR_NAME}/index.js`,
    format: 'cjs',
    plugins: [terser()],
  },
  plugins: [
    cleaner({
      targets: [`${PUBLIC_DIR_NAME}/${BIULD_DIR_NAME}/`],
    }),
    typescript(),
    url({
      destDir: `${PUBLIC_DIR_NAME}/${BIULD_DIR_NAME}/images`,
      publicPath: `/${BIULD_DIR_NAME}/images/`,
    }),
    postcss({
      plugins: [],
      extract: true,
      minimize: true,
    }),
    nodeResolve({ browser: true }),
    dev({
      dirs: [PUBLIC_DIR_NAME],
      spa: `${PUBLIC_DIR_NAME}/index.html`,
      port: 3000,
    }),
  ],
};
