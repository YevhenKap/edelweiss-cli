# [1.0.0-alpha.1] - 2021-04-17

Package is completely rewritten.

### Changed

- `rollup` bundler replaced by [`parcel`](https://v2.parceljs.org).
- Output message of CLI.

### Removed

- Prompt to install dependencies. Now they are installed automatically.
- Prompt to initialize git repository. Now you should do it manually, if you want.
- TypeScript template.

## [0.7.1] - 2020-12-02

### Changed

- Bump `@prostory/edelweiss` package version.
- Adopt sample app to new version.

## [0.7.0] - 2020-12-02

### Added

- _dedupe_ option to `@rollup/plugin-node-resolve` plugin.
- Strict options to `tsconfig.json`.

### Changed

- _target_ option for TS compiler increased to `ES2018`.
- Move `typescript` and `terser` plugins in rollup config.
- Bump version of packages.
- Simplify rollup config file.

## Fixed

- Link to docs for JavaScript and TypeScript templates.

## [0.6.2] - 2020-10-04

### Changed

- Bump `@prostory/edelweiss`.
- Add link to doc site in README.

## [0.6.1] - 2020-09-28

### Added

- Fallback page for unknown routes.

## [0.6.0] - 2020-09-23

### Added

- Ability to pass to console name of project and creating directory for it.

### Changed

- Generation of _package.json_ and Rollup config file.

### Removed

- Generation of _es_consfig.mjs_ file.

## [0.5.1] - 2020-09-18

### Changed

- Bump up dependencies.

### Fixed

- Path to workspace's TypeScript version.

## [0.5.0] - 2020-09-01

### Added

- VSCode now will use project's TypeScript version.

### Fixed

- Crashing dev server on error in `.ts` files.

### Removed

- `postcss-preset-env` plugin.
- Ability to import `.pcss` and `.postcss` files.
- Ability to have `.m.*` and `.mod.*` parts in CSS modules, due to types conflicts.

## [0.4.4] - 2020-08-28

### Added

- `postcss-import` plugin to templates.

## [0.4.3] - 2020-08-28

### Added

- TypeScript now recognize css files with such extensions `.pcss` and `.postcss`. Also css module now can has `.m.*` and `.mod.*` part to signals that css must be interpreted as module.
- Autocompletion in css with `PostCSS` extension.
- Edelweiss configuration file for development process.

### Changed

- Rollup configuration file to handle both templates.

### Fixed

- Building TypeScript project with imported css modules.

## [0.4.2] - 2020-08-27

### Added

- `common` directory where live common files for all templates.

### Changed

- Compress icons.

## [0.4.1] - 2020-08-27

### Removed

- Unnecessary icons (left only two) and config file for Windows 10 (it should be generated by developer itself).

## [0.4.0] - 2020-08-27

### Added

- `Prettier` config file to `typescript` template.
- `robots.txt`.
- Make Edelweiss as PWA-ready (added manifest file, icons and service worker).

### Fixed

- Name of `@types/file_modules.ts` in _tsconfig.json_.

## [0.3.1] - 2020-08-25

### Changed

- `file_modules.ts` renamed to `file_modules.d.ts`.

## [0.3.0] - 2020-08-25

### Added

- Add `typescript` template.

## [0.2.1] - 2020-08-25

### Changed

- Bump packages.
- Fun message when project is ready.

## [0.2.0] - 2020-08-23

### Added

- Initial app that anyone can try.

### Changed

- `js` template to `javascript` with complete rewrite of inner structure.
- Template now contain small example of Edelweiss SPA.

### Removed

- `flow-js` template.

## 0.1.0

- Make templates for plain JS powered project and for Flow JS powered project.
- Make simple cli that can receive small amount of arguments.
- Write README.
- Add `edelweiss` and `baum` typings.

## 0.0.1

- Initial commit. Creating a library.
