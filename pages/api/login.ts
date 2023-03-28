import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByCode } from '@/shared/dingtalk'
import prisma from '@/lib/prisma'
import { sign } from '@/shared/jwt'
import { LoginInfo, Result } from '@/types'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<LoginInfo | null>>
) {
  req.headers['Content-Type'] = 'application/json'
  if (req.method === 'POST') {
    const { code } = JSON.parse(req.body)
    const userInfo = await getUserByCode(code)
    if (userInfo) {
      const token = await sign({ userId: userInfo.userId })
      const u = await prisma.user.findFirst({
        where: {
          userId: userInfo.userId
        }
      })
      if (!u) {
        await prisma.user.create({
          data: {
            userId: userInfo.userId,
            name: userInfo.name,
            avatar: userInfo.avatar,
            email: userInfo.email,
            title: userInfo.title,
          }
        })
      }
      res.status(200).json({
        errcode: 0,
        message: '登录成功',
        data: {
          token,
          userInfo
        }
      })
    } else {
      res.status(401).json({
        errcode: 401,
        message: '登录失败',
        data: null
      })
    }
  }
}
