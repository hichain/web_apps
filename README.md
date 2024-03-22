# HICHAIN Apps

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/hichain/web_apps/deploy_web.yml?label=Web%20Server&style=flat-square&branch=master" alt="Web Server" />
  <img src="https://img.shields.io/github/actions/workflow/status/hichain/web_apps/deploy_master.yml?label=Master%20Server&style=flat-square&branch=master" alt="Master Server" />
  <img src="https://img.shields.io/github/v/release/hichain/web_apps?style=flat-square" alt="Version"/>
</p>

<p align="center">
  <a href="https://apps.hichain.jp"><img src="https://github.com/hichain/web_apps/blob/master/src/client/public/og_image.png?raw=true" alt="logo" /></a>
</p>

<p align="center">
  https://apps.hichain.jp<br>
  Hichain Projectが制作したボードゲームを遊べるWebアプリ<br>
  Multiplayer online games published by Hichain Project
</p>

## Available Games

- slashchain

## Requirements

- Node.js v14.x

## Usage

### Installation

```
$ yarn
```

### Running Game Client

```
$ yarn start:client
[optional] $ yarn tsc-watch:client
```

### Running Game Master Server (local)

```
$ yarn start:server
[optional] $ yarn tsc-watch:server
```

### Running Tests

```
$ yarn test
```

### Running Linter

```
$ yarn lint
```

## Technology Stacks

### Common

- [TypeScript](https://www.typescriptlang.org/)
- [yarn](https://yarnpkg.com)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [stylelint](https://stylelint.io/)
- [Jest](https://jestjs.io/) + [ts-jest](https://github.com/kulshekhar/ts-jest)
- [Dayjs](https://day.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [lodash](https://lodash.com/)

### Frontend

- [boardgame.io](https://github.com/boardgameio/boardgame.io)
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [React Redux](https://react-redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux-Saga](https://redux-saga.js.org/) + [typed-redux-saga](https://github.com/agiledigital/typed-redux-saga)
- [Redux-LocalStorage-Simple](https://www.npmjs.com/package/redux-localstorage-simple)
- [React Indiana Drag Scroll](https://www.npmjs.com/package/react-indiana-drag-scroll)
- [Sass](https://sass-lang.com/)
- [styled-components](https://styled-components.com/)
- [MUI](https://mui.com/)
- [notistack](https://github.com/iamhosseindhv/notistack)
- [vite](https://vitejs.dev/)
- [clsx](https://www.npmjs.com/package/clsx)

### Backend

- [boardgame.io](https://github.com/boardgameio/boardgame.io)
- [node.js](https://nodejs.org)

### Recommended Editor

- [Visual Studio Code](https://code.visualstudio.com/)

## Changelog

See [Releases](https://github.com/hichain/web_apps/releases)

## License

No License
