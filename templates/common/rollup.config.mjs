import fs from 'fs';
import url from '@rollup/plugin-url';
import dev from 'rollup-plugin-dev';
import path from 'path';
import nested from 'postcss-nested';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import injectManifest from 'rollup-plugin-workbox-inject';
import postCssPresetEnv from 'postcss-preset-env';
import { terser } from 'rollup-plugin-terser';
import { template } from './es_config.mjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/**
 * You may change constants below as you want.
 * Note that relative changes need to be done in files
 * or directories that relies on this names.
 */
const PUBLIC_DIR_NAME = 'public';
const BIULD_DIR_NAME = 'build';
// Change if you have another file as entry point.
const ENTRY_FILE_NAME = 'index';

/** Store all possible templates and configs for Rollup. */
const Templates = Object.freeze({
  typescript: {
    extensions: ['.ts'],
  },
  javascript: {
    extensions: ['.js', '.mjs', '.cjs'],
  },
});

function getRootDir() {
  const FILE_PROTOCOL = 'file://';
  return path.dirname(import.meta.url).slice(FILE_PROTOCOL.length - 1);
}

function findEntryFile(templateName) {
  return (
    Templates[templateName].extensions
      .map((ext) => `src/${ENTRY_FILE_NAME}${ext}`)
      .filter((filePath) => fs.existsSync(`${getRootDir()}/${filePath}`))[0] ||
    // fallback - first extension in list
    `src/${ENTRY_FILE_NAME}${Templates[templateName].extensions[0]}`
  );
}

function isTS(templateName) {
  return templateName === 'typescript';
}

export default () => {
  const sourcePlugins = [
    cleaner({
      targets: [`${PUBLIC_DIR_NAME}/${BIULD_DIR_NAME}/`],
    }),
    url({
      destDir: `${PUBLIC_DIR_NAME}/${BIULD_DIR_NAME}/images`,
      publicPath: `/${BIULD_DIR_NAME}/images/`,
    }),
    postcss({
      plugins: [nested(), autoprefixer(), postCssPresetEnv()],
      extract: true,
      minimize: true,
    }),
    nodeResolve({ browser: true }),
    dev({
      dirs: [PUBLIC_DIR_NAME],
      spa: `${PUBLIC_DIR_NAME}/index.html`,
      port: 3000,
    }),
  ];

  if (isTS(template)) {
    sourcePlugins.splice(1, 0, typescript());
  }

  return [
    {
      input: findEntryFile(template),
      output: {
        file: `${PUBLIC_DIR_NAME}/${BIULD_DIR_NAME}/index.js`,
        format: 'cjs',
        plugins: [terser()],
      },
      plugins: sourcePlugins,
    },
    {
      input: 'src/service_worker/service_worker.js',
      output: {
        file: `${PUBLIC_DIR_NAME}/service_worker.js`,
        format: 'cjs',
        plugins: [terser()],
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'production'
          ),
        }),
        injectManifest({
          globDirectory: PUBLIC_DIR_NAME,
          globPatterns: [`./**/*`],
        }),
        nodeResolve({ browser: true }),
      ],
    },
  ];
};
