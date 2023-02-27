import type { NextApiRequest, NextApiResponse } from 'next'
import { LoginInfo, Result, TokenInfo } from '../types'
import prisma from '@/lib/prisma'
import { sign } from '@/shared/jwt'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<LoginInfo | null>>
) {
  req.headers['Content-Type'] = 'application/json'
  if (req.method === 'POST') {
    const { accessToken } = await getAccessToken()
    const result = await fetch(`https://oapi.dingtalk.com/topapi/v2/user/getuserinfo?access_token=${accessToken}`, {
      method: 'POST',
      body: req.body,
    })
    const userData = await result.json()
    if (userData.errcode === 0) {
      const token = await sign({ userId: userData.result.userid })
      const user = await prisma.user.findFirst({ where: { userId: userData.result.userid } })
      if (!user) {
        await prisma.user.create({
          data: {
            userId: userData.result.userid,
            name: userData.result.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })
      }
      res
        .status(200)
        .json({
          errcode: 0,
          message: '获取用户信息成功',
          data: {
            userInfo: {
              name: userData.result.name,
              userId: userData.result.userid,
            },
            jwt: {
              token
            }
          }
        })
    } else {
      res.status(500).json({ errcode: 1, message: '获取用户信息失败', data: null })
    }
  }
}

async function getAccessToken() {
  const key = process.env.APP_KEY
  const secret = process.env.APP_SECRET
  const res = await fetch(`https://oapi.dingtalk.com/gettoken?appkey=${key}&appsecret=${secret}`, { method: 'GET' })
  const data = await res.json()
  return {
    accessToken: data.access_token,
    expire: data.expires_in,
  } as TokenInfo
}
