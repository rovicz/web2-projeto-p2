# API Universidade - Projeto P1

API Node.js + TypeScript baseada no diagrama de banco.

## Estrutura interpretada do banco

O PDF possui as tabelas `situations`, `users`, `product_categories`, `product_situations`, `products` e `migrations`.

Relacionamentos implementados:

- `users.situationId` -> `situations.id`.
- `products.productCategoryId` -> `product_categories.id`.
- `products.productSituationId` -> `product_situations.id`.

Observação: no diagrama, o campo `products.price` aparece como `DECIMAL(2)`. Na API, ele foi implementado como `DECIMAL(10,2)`, mantendo 2 casas decimais e evitando limite irreal de valor.

## Stack

- Node.js.
- TypeScript.
- Express.
- TypeORM.
- MySQL 8.
- Zod para validação.
- Postman Collection com variáveis.

## Como rodar

```bash
cp .env.example .env
docker compose up -d
npm install
npm run migration:run
npm run seed
npm run dev
```

A API sobe por padrão em:

```txt
http://localhost:3333/api/v1
```

## Scripts

```bash
npm run dev              # sobe em modo desenvolvimento
npm run build            # compila TypeScript
npm start                # roda dist/server.js
npm run migration:run    # cria schema no banco
npm run migration:revert # reverte última migration
npm run seed             # cadastra dados iniciais
```

## Rotas

Todas as rotas seguem o padrão:

```json
{
  "data": {},
  "meta": {}
}
```

Em erros:

```json
{
  "error": true,
  "message": "Mensagem do erro",
  "details": []
}
```

### Health

| Método | Rota |
|---|---|
| GET | `/health` |

### Situations

| Método | Rota |
|---|---|
| GET | `/situations` |
| GET | `/situations/:id` |
| POST | `/situations` |
| PATCH | `/situations/:id` |
| DELETE | `/situations/:id` |

### Users

| Método | Rota |
|---|---|
| GET | `/users` |
| GET | `/users/:id` |
| POST | `/users` |
| PATCH | `/users/:id` |
| DELETE | `/users/:id` |

### Product Categories

| Método | Rota |
|---|---|
| GET | `/product-categories` |
| GET | `/product-categories/:id` |
| POST | `/product-categories` |
| PATCH | `/product-categories/:id` |
| DELETE | `/product-categories/:id` |

### Product Situations

| Método | Rota |
|---|---|
| GET | `/product-situations` |
| GET | `/product-situations/:id` |
| POST | `/product-situations` |
| PATCH | `/product-situations/:id` |
| DELETE | `/product-situations/:id` |

### Products

| Método | Rota |
|---|---|
| GET | `/products` |
| GET | `/products/:id` |
| POST | `/products` |
| PATCH | `/products/:id` |
| DELETE | `/products/:id` |

## Filtros e paginação

Listagens aceitam:

```txt
?page=1&limit=10&search=texto
```

Produtos também aceitam:

```txt
?productCategoryId=1&productSituationId=1
```

## Collection

Arquivos gerados em `postman/`:

- `Diagrama P2 API.postman_collection.json`.
- `Diagrama P2 Local.postman_environment.json`.

Importe os dois no Postman. A collection usa variáveis como:

- `baseUrl`.
- `situationId`.
- `userId`.
- `productCategoryId`.
- `productSituationId`.
- `productId`.

As rotas de criação já possuem scripts para gravar os IDs retornados nessas variáveis.

## OpenAPI

Também foi gerado `docs/openapi.yaml`, útil para importar em ferramentas como API Dog, Swagger e similares.
