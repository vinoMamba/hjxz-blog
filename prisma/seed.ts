import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  //创建分类初始化数据,如果已经存在则不创建
  const categories = await prisma.category.findMany()
  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [
        { name: '前端' },
        { name: '后端' },
        { name: '数据库' },
        { name: '运维' },
        { name: '测试' },
      ],
    })
    console.log('分类初始化数据创建成功')
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
