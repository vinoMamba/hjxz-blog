import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//生成随机数字字符串
function randomNum(n: number) {
  let t = ''
  for (let i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10)
  }
  return t
}



async function main() {
  const user = await prisma.user.create({
    data: {
      userId: randomNum(4),
      name: `test${randomNum(2)}`,
    }
  })
  if (user) {
    const post = await prisma.post.create({
      data: {
        title: 'first post' + randomNum(2),
        content: 'first post content' + randomNum(2),
        authorId: user.userId,
        published: true,
      }
    })
    console.log(user)
    console.log(post)
  }
}
main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
