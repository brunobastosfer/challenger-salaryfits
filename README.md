<p align="center">
  <a href="https://www.salaryfits.com.br/" target="_blank"><img src="https://cdn.prod.website-files.com/604f6dd6484918ba61b90055/660c3ae38c4e84e1e8e4faad_LOGO.png" width="200" alt="Salary Fit Logo" /></a>
</p>

## Description

API desenvolvida para criação de estoque e medicamentos e geração de relatórios de entrada e saídas.

## Tecnologias

- Projeto criado com
  [Nest]
- Banco de dados utilizado:
  [Postgres]
- ORM utilizada
  [Prisma]

## Instalação

```bash
$ npm install
```

## Para rodar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Para buildar o projeto

```bash
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Observações:

- Ao executar o projeto, será enviado dois seeds para o banco de dados. Ambos são para criar usuários no banco de dados.
- Observar as variáveis de ambiente.
- Lembre-se de rodar todas as migrates antes de executar o projeto. Segue o comando:
- ```bash $ npx prisma migrate dev```

## Contatos

- Author - [Bruno bastos Fernandes](https://br.linkedin.com/in/brunobastosfer)
