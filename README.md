# Edelweiss CLI - for creating [edelweiss](https://github.com/YevhenKap/edelweiss) powered apps.

> For using this CLI you must have NodeJS version >= **13.4.0** (From this version ES modules is enabled by default).

CLI generates site that is [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)-ready and you can configure it as you want.

## Installation

```sh
npm i -g @prostory/edelweiss-cli
```

or

```sh
yarn global add @prostory/edelweiss-cli
```

## Usage

```sh
$ mkdir my-project
$ cd my-project
$ es
```

Simply type this commands in your terminal and answer to questions. That is all 🤗

Also you may set arguments to `es` utility:

- `-t` or `--template` with parameter: **javascript**(for projects on plain JavaScript. Used as default template.) or **typescript**.

> Another templates are in progress.

```sh
$ es -t javascript
```

- `-g` or `--git`: if it is provided, then git repository will be initialized automatically.

```sh
$ es -g
```

- `-i` or `--install`: if it is provided, then all dependencies will be installed.

> _npm_ will be used. Do not provide this argument if you use another package manager.

```sh
$ es -i
```

- `-s` or `--skip`: if it is provided, you will skip all questions and default project with only plain JavaScript will be created.

> If other arguments except `-t` will be provided, they will be ignored.

```sh
$ es -s
```

Full syntax:

```sh
$ es -t javascript -g -i
```

## Configuration

### Styles

You can import into JS(TS) files CSS files. It is valid, but note that they aren't provide value for import. If you do so, there will be error.

```ts
// Valid
import './some_file.css';

// Invalid
import styles from './some_file.css';
```

For possibility to import value from styles, define style as _module_. Then you will can to get selectors from imported value (they will be generated by `PostCSS`).

> _Module_ is a file that satisfies such pattern: `"\\.module\\.(c|le|sa|sc)ss$"`.

```ts
import styles from './some_file.module.css';

// Here will be generated "main" class.
const mainClass = styles.main;
```

In order to use _Sass/Less_ install corresponding dependency:

- For `Sass` install _node-sass_: ```sh yarn add node-sass --dev```
- For `Less` install _less_: ```sh yarn add less --dev```

#### PostCSS

If you use [PostCSS](https://postcss.org) as CSS preprocessor and you use VSCode for development, you may want to install [PostCSS language support](https://github.com/csstools/postcss-language) plugin for VSCode, that adds support for modern and experimental CSS. Autocompletion is already configured for files with `.css` extension (though there is [bug with autocompletion with this plugin](https://github.com/csstools/postcss-language/issues/2)).

## Templates

### JavaScript

Files can have such extensions: `.js`, `,mjs` and `.cjs`.
If you prefer use the newest ECMASript standard you can add [`Babel` plugin](https://github.com/rollup/plugins/tree/master/packages/babel) to transform code.

## LICENSE

Created under [MIT license](LICENSE)
