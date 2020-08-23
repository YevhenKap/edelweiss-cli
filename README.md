# Edelweiss CLI - for creating [edelweiss](https://github.com/YevhenKap/edelweiss) powered apps.

> For using this CLI you must have NodeJS version >= **13.4.0** (From this version ES modules is enabled by default).

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

- `-t` or `--template` with parameter: **javascript**(for projects on plain JavaScript). Used as default template.

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

## LICENSE

Created under [MIT license](LICENSE)
