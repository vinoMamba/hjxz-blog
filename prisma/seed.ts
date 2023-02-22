import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

//生成随机数字字符串
function randomNum(n: number) {
  let t = ''
  for (let i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10)
  }
  return t
}

//初始化分类表
async function initCategory() {
  const categoryList: Prisma.CategoryCreateInput[] = [
    { name: '前端' },
    { name: '后端' },
    { name: '运维' }
  ]
  const firstCategory = await prisma.category.findFirst()
  if (firstCategory) return
  const list = await Promise.all(categoryList.map(async (item) => {
    return await prisma.category.create({
      data: item
    })
  }))
  console.log('初始化分类表成功')
  console.log(list)
}

async function initUserList() {
  const userList: Prisma.UserCreateInput[] = [
    {
      name: 'vino',
      userId: '0001',
    },
    {
      name: 'vino2',
      userId: '0002',
    },
    {
      name: 'koko',
      userId: '0003',
    },
    {
      name: 'jay',
      userId: '0004',
    },
  ]
  const firstUser = await prisma.user.findFirst()
  if (firstUser) return
  const list = await Promise.all(userList.map(async (item) => {
    return await prisma.user.create({
      data: item
    })
  }
  ))
  console.log('初始化用户表成功')
  console.log(list)
}

async function initPostList() {
  const PostList: Prisma.PostCreateInput[] = [
    { title: '标题1-前端', content: '内容1-前端xxxx', authorId: '0004', categoryId: 1, tags: [1, 2] },
    { title: '标题2-前端', content: '内容2-前端xxxx', authorId: '0004', categoryId: 1 },
    { title: '标题4-后端', content: '内容4-后端xxxx', authorId: '0003', categoryId: 2 },
    { title: '标题5-后端', content: '内容5-后端xxxx', authorId: '0002', categoryId: 2 },
    { title: '标题6-后端', content: '内容6-后端xxxx', authorId: '0001', categoryId: 2 },
    { title: '标题12-前端', content: '内容1-前端xxxx', authorId: '0001', categoryId: 1 },
    { title: '标题13-前端', content: '内容1-前端xxxx', authorId: '0002', categoryId: 1 },
    { title: '标题14-前端', content: '内容1-前端xxxx', authorId: '0003', categoryId: 1 },
  ]
  const firstPost = await prisma.post.findFirst()
  if (firstPost) return
  const list = await Promise.all(PostList.map(async (item) => {
    return await prisma.post.create({
      data: item
    })
  }
  ))
  console.log('初始化文章表成功')
  console.log(list)
}

async function initTagList() {
  const TagList: Prisma.TagCreateInput[] = [
    { name: 'tag1', createById: '0004' },
    { name: 'tag2', createById: '0004' },
  ]
  const firstTag = await prisma.tag.findFirst()
  if (firstTag) return
  const list = await Promise.all(TagList.map(async (item) => {
    return await prisma.tag.create({
      data: item
    })
  }
  ))
  console.log('初始化标签表成功')
  console.log(list)
}
async function initPostTag() { 
  const postTagList: Prisma.PostTagCreateInput[] = [
    { postId: 4, tagId: 1 },
    { postId: 4, tagId: 2 },
  ]
  const firstPostTag = await prisma.postTag.findFirst()
  if (firstPostTag) return
  const list = await Promise.all(postTagList.map(async (item) => {
    return await prisma.postTag.create({
      data: item
    })
  }
  ))
  console.log('初始化文章标签表成功')
  console.log(list)
}

async function main() {
  await initCategory()
  await initUserList()
  await initPostList()
  await initTagList()
  await initPostTag()
}
main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
