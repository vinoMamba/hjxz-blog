# Getting Started
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## docker commands

```bash
docker-compose up -d
docker-compose down
```

## Prisma

```bash
npx prisma migrate dev --name init
npx prisma db seed --preview-feature
```


## 数据库设计

### 用户表

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | int | 用户id |
| name| text| 用户名 |
| userId| text| 钉钉Id|
|createAt|timestamp|创建时间|
|updateAt|timestamp|更新时间|

### 博客表

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | int | 博客id |
| title| varchar | 博客标题 |
| content| text | 博客内容|
|authorId| text |用户id|
|published|boolean|是否发布|
|categoryId|int|分类id|
|createAt|timestamp|创建时间|
|updateAt|timestamp|更新时间|

### 分类表

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | int | 分类id |
| name| varchar | 分类名称 |
|createById|int|用户id|
|createAt|timestamp|创建时间|
|updateAt|timestamp|更新时间|

