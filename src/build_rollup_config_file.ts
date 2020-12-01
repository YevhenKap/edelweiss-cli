import { Templates } from './enums';

export function buildRollupConfigFile(templateName: Templates): string {
  const isTS = templateName === Templates.TypeScript;

  return `
  import url from '@rollup/plugin-url';
  import dev from 'rollup-plugin-dev';
  import nested from 'postcss-nested';
  import cleaner from 'rollup-plugin-cleaner';
  import postcss from 'rollup-plugin-postcss';
  ${isTS ? "import typescript from '@rollup/plugin-typescript';" : ''}
  import inlineImport from 'postcss-import';
  import autoprefixer from 'autoprefixer';
  import { terser } from 'rollup-plugin-terser';
  import { nodeResolve } from '@rollup/plugin-node-resolve';
  import { injectManifest } from 'rollup-plugin-workbox';
  
  /**
   * You may change constants below as you want.
   * Note that relative changes need to be done in files
   * or directories that relies on this names.
   */
  const PUBLIC_DIR_NAME = 'public';
  const BIULD_DIR_NAME = 'build';
  
  export default {
    input: \`src/index.${isTS ? 'ts' : 'js'}\`,
    output: {
      file: \`\${PUBLIC_DIR_NAME}/\${BIULD_DIR_NAME}/index.js\`,
      format: 'es',
    },
    plugins: [
      cleaner({
        targets: [\`\${PUBLIC_DIR_NAME}/\${BIULD_DIR_NAME}/\`],
      }),
      url({
        destDir: \`\${PUBLIC_DIR_NAME}/\${BIULD_DIR_NAME}/images\`,
        publicPath: \`/\${BIULD_DIR_NAME}/images/\`,
      }),
      postcss({
        plugins: [inlineImport(), nested(), autoprefixer()],
        extract: true,
        minimize: true,
      }),
      nodeResolve({
        browser: true,
        dedupe: [
          /* 
           * Place names of dependencies, that need to be unique.
           * And plugin will remove all duplicates.
           */
        ]
      }),
      ${isTS ? 'typescript({ noEmitOnError: false }),' : ''}
      terser(),
      injectManifest({
        swSrc: 'src/service_worker/service_worker.js',
        swDest: \`\${PUBLIC_DIR_NAME}/service_worker.js\`,
        globDirectory: PUBLIC_DIR_NAME,
        globPatterns: ['./**/*'],
        mode: 'production',
      }),
      dev({
        dirs: [PUBLIC_DIR_NAME],
        spa: \`\${PUBLIC_DIR_NAME}/index.html\`,
        port: 3000,
      }),
    ],
  };
  `;
}
