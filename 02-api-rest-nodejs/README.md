# NodeJS Rest Api (Fastify)

## Setup

```sh
npm init -y && \
npm i -D typescript @types/node tsx vitest @vitest/coverage-v8 supertest @types/supertest tsup sqlite && \
npx tsc --init && \  # Init typescript config
npm i fastify @fastify/cookie dotenv zod knex && \
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
    "dev": "tsx watch src/server.ts",
    "build": "tsup src",
    "test": "vitest",
    "test:ci": "vitest run --coverage"
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

### KnexJS

_Query Builder_

```sh
npm run knex -- migrate:make create-transactions
```

```sh
npm run knex -- migrate:latest
```

## Requirements

## Functional Requirements

_System characteristics_

- [x] An user must be able to create a new transaction;
- [x] An user must be able to obtain a summary of his account;
- [x] An user must be able to list all past transactions;
- [x] An user must be able to query a transaction;

## Business Rules

- [x] The transaction may be of kind credit which will sum to total amount, or debit to subtract from total amount;
- [ ] It must be possible to identify the user from each request;
- [ ] The user can only see transactions created by himself;

## Non-Functional Requirements

_Technical ..._
