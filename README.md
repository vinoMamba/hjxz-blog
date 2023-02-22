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
# 后台启动
docker-compose up -d
# 停止
docker-compose down
```

## Postgres

```bash
docker-compose exec db psql -U blog
# 查看时区
show timezone;
# 设置时区
set timezone to 'Asia/Shanghai';
```

## Prisma

```bash
npx prism init
npx prisma migrate dev --name init
npx prisma generate
```

## Database

```prisma
// 用户信息
model User {
  id        Int      @id @default(autoincrement())
  userId    String   @unique
  name      String?
  createdAt DateTime @default(now()) @db.Timestamptz // timestamp with time zone !!! important
  updatedAt DateTime @updatedAt @db.Timestamptz
}

// 博客信息
model Post {
  id         Int      @id @default(autoincrement())
  title      String
  content    String
  authorId   String
  categoryId Int
  tags       Int[]
  published  Boolean  @default(false)
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}

// 标签
model Tag {
  id         Int      @id @default(autoincrement())
  name       String
  createById String //userId
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}

// 文章标签关联表
model PostTag {
  id        Int      @id @default(autoincrement())
  postId    Int[]
  tagId     Int[]
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}

//分类
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}
```

