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

## 加入开发

#### 这是一个给公司内部使用的在线技术平台，会结合一些些钉钉的开放功能。目前还在开发中，欢迎有兴趣的同事加入开发。

> 项目还在开发中，欢迎大家一起参与开发
> 开发要求：
> 1. 你需要了解一点 Next.js 和 React。这样你才能更好的理解项目的结构和代码。[Nextjs 中文网站](https://www.nextjs.cn/)
> 2. 你可以提出你的想法，同时希望你有能力去实现它。

- [ ] 1. 技术平台首页未完成(pages/index.tsx)

需求描述：首页展示最近的文章，默认按照时间排序，可以根据分类和标签进行筛选。左侧显示最近的文章，右侧显示分类。(类似于掘金首页)

- [ ] 2. 个人中心未完成(pages/user/index.tsx)

需求描述： 个人中心只展示个人基础信息，文章(已发布的文章)，草稿(未发布的文章)，点赞的信息,评论的信息。(类似于掘金个人中心)

