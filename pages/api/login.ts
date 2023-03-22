import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByCode } from '@/shared/dingtalk'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<User | null>>
) {
  req.headers['Content-Type'] = 'application/json'
  if (req.method === 'POST') {
    const { code } = JSON.parse(req.body)
    const userInfo = await getUserByCode(code)
    if (userInfo) {
      res.status(200).json({
        errcode: 0,
        message: '登录成功',
        data: userInfo
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
