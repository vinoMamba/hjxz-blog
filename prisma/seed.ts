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
  await Promise.all(categoryList.map(async (item) => {
    await prisma.category.create({
      data: item
    })
  }))
}



async function main() {
  await initCategory()
}
main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
