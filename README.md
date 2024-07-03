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

## Variáveis de ambiente
- DATABASE_URL= _insira a url do seu banco de dados aqui_
- JWT_SECRET= _insira um secret aqui. Ex: aaabbbcccd_
- ADMIN_PASSWORD= _insira uma senha para o admin. Ex= abc123_
- INVITER_SECRET= _insira uma senha para o inviter. Ex=123abc_


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
 ```bash
  $ npx prisma migrate dev
 ```
- Apenas admins podem criar medicamentos.
- Convidado e admin podem verificar todos os medicamentos
- Login como admin, é o email: admin@email.com.br e como convidado é: convidado@email.com.br

## Docker
- Criação em andamento.

## Contatos

- Author - [Bruno bastos Fernandes](https://br.linkedin.com/in/brunobastosfer)
