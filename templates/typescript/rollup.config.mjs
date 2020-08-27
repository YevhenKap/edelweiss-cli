import url from '@rollup/plugin-url';
import dev from 'rollup-plugin-dev';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import injectManifest from 'rollup-plugin-workbox-inject';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const PUBLIC_DIR_NAME = 'public';
const BIULD_DIR_NAME = 'build';

export default [
  {
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
  },
  {
    input: 'src/service_worker/service_worker.ts',
    output: {
      file: `${PUBLIC_DIR_NAME}/service_worker.js`,
      format: 'cjs',
      plugins: [terser()],
    },
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'production'
        ),
      }),
      injectManifest({
        globDirectory: PUBLIC_DIR_NAME,
        globPatterns: [
          'index.html',
          'favicon.ico',
          'robots.txt',
          'manifest.json',
          'icons/**/*',
          `${BIULD_DIR_NAME}/**/*`,
        ],
      }),
      nodeResolve({ browser: true }),
    ],
  },
];
