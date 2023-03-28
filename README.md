# Getting Started
```bash
pnpm i
pnpm dev
```
## docker commands
```bash
# 后台启动数据库
docker-compose up -d
# 停止数据库
docker-compose down
```
## Postgres
```bash
# 如果你发现你的数据库存储的实践早八小时，那么你需要设置时区
docker-compose exec db psql -U blog
# 查看时区
show timezone;
# 设置时区
set timezone to 'Asia/Shanghai';
```

## Prisma
> ORM
>
> Prisma is an open-source database toolkit that makes it easy for developers to reason about their data and simplify database workflows.
```bash
# 初始化
npx prism init
#  数据库迁移
npx prisma migrate dev --name init
# 生成客户端
npx prisma generate
```

## Database

```prisma
// 用户信息
model User {
  id        Int      @id @default(autoincrement())
  userId    String   @unique
  avatar    String
  name      String
  email     String
  title     String
  createdAt DateTime @default(now()) @db.Timestamptz // timestamp with time zone !!! important
  updatedAt DateTime @updatedAt @db.Timestamptz
}

// 用户的文章
model Article {
  id          Int      @id @default(autoincrement())
  title       String
  content     String
  description String
  authorId    String
  isPublished Boolean  @default(false)
  categoryId  Int
  createdAt   DateTime @default(now()) @db.Timestamptz // timestamp with time zone !!! important
  updatedAt   DateTime @updatedAt @db.Timestamptz
}

// 文章分类
model Category {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now()) @db.Timestamptz // timestamp with time zone !!! important
  updatedAt DateTime @updatedAt @db.Timestamptz
}
```
