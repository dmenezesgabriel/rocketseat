# App

Gympass style app.

## Features

### RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter os dados de um usuário logado;
- [x] Deve ser possível obter o numero de check-ins realizados por usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Setup

```sh
npm init -y && \
echo "save-exact=true" >> .npmrc && \
npm i -D typescript @types/node tsx vitest @vitest/ui vite-tsconfig-paths @vitest/coverage-v8 supertest @types/supertest tsup prisma supertest @types/supertest && \
npx tsc --init && \  # Init typescript config
npm i fastify @fastify/jwt @fastify/cookie dotenv zod knex @prisma/client && \
mkdir src && \
touch src/server.ts && \
touch src/app.ts && \
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

```json
// eslint.config.mjs
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Other configuration
  eslintConfigPrettier,
];
```

### Prisma

#### Concepts

- <ModelName>UncheckedCreateInput: Pass related entities IDs upon model creation
- <ModelName>CreateInput: Create also related entities upon model creation

#### Commands

- **Generate config**:

```sh
npx prisma init
```

- **Generate types**:

```sh
npx prisma generate
```

- **Generate a migration**:

```sh
npx prisma migrate dev
```

- **Apply migrations**:

```sh
npx prisma migrate deploy
```

- **Open studio ui**:

```sh
npx prisma studio
```

## Tests

```sh
cd prisma/vitest-environments-prisma && \
npm link && \
cd ../../ && \
# on Root Dir
npm link vitest-environments-prisma
```

## Resources

- [In Memory Database Pattern](https://martinfowler.com/bliki/InMemoryTestDatabase.html)
- [rest-client](https://renatogroffe.medium.com/dicas-de-visual-studio-code-testando-apis-rest-via-scripts-pt-14-7d52c7b4b8af)
