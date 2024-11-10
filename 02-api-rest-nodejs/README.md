# NodeJS Rest Api (Fastify)

## Setup

```sh
npm init -y && \
npm i -D typescript @types/node tsx && \
npx tsc --init && \  # Init typescript config
npm i fastify && \
mkdir src && \
touch src/server.ts
```

```sh
npm install --save-dev --save-exact prettier && \
npm install --save-dev eslint-config-prettier && \
node --eval "fs.writeFileSync('.prettierrc','{}\n')" && \
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')" && \
npm init @eslint/config@latest
```

```json
// tsconfig.json
{ "target": "es2020" }


// set target to es2020
```

```json
// package.json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

```js
// eslint.config.mjs
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Other configuration
  eslintConfigPrettier,
];
```

```json
// settings.json (vscode)
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": false,
  "editor.formatOnSave": false,
  "[json]": { "editor.formatOnSave": true },
  "[javascript]": { "editor.formatOnSave": true },
  "[typescript]": { "editor.formatOnSave": true },
  "[markdown]": { "editor.formatOnSave": true },
  "[html]": { "editor.formatOnSave": true }
}
```

## Database

## Query Builders

- KnexJS
