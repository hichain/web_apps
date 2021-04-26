# HICHAIN Web Apps

<p align="center">
  <img src="https://img.shields.io/github/workflow/status/hichain/web_apps/Node.js%20CI?style=flat-square" alt="Build Status"/>
  <img src="https://img.shields.io/github/v/release/hichain/web_apps?style=flat-square" alt="Version"/>
</p>

<p align="center">
  https://apps.hichain.jp
</p>

Hichain Projectが制作したボードゲームを遊べるWebアプリ  
Multiplayer online games published by Hichain Project

## Available Games

- slashchain

## Requirements

- Node.js v15.12.0

## Usage

### Installation

```
$ yarn
```

### Running Game Client

```
$ yarn start:client
```

### Running Game Master Server (local)

```
$ yarn start:master
```

### Running Tests

```
$ yarn test
```

### Running Linter

```
$ yarn lint
```

## Technology stacks

### Frontend

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [boardgame.io](https://github.com/boardgameio/boardgame.io)
- [styled-component](https://styled-components.com/)
- [Sass](https://sass-lang.com/)
- [Reboot.css](https://github.com/twbs/bootstrap/releases/tag/v4.6.0)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [stylelint](https://stylelint.io/)
- [Jest](https://jestjs.io/)
- [yarn](https://yarnpkg.com)
- [webpack](https://webpack.js.org/)
- [husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)

### Backend

- [TypeScript](https://www.typescriptlang.org/)
- [boardgame.io](https://github.com/boardgameio/boardgame.io)
- [express](https://expressjs.com/ja/)

### Editor

- [Visual Studio Code](https://code.visualstudio.com/)

## Changelog

See [Releases](https://github.com/hichain/web_apps/releases)

## License

No License
