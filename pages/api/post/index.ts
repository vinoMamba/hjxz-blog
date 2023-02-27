import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'
import { Result } from '@/pages/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Post | null | number>>
) {
  req.headers['Content-Type'] = 'application/json'
  switch (req.method) {
    case 'GET':
      break
    case 'POST':
      try {
        const post = await prisma.post.create({ data: req.body })
        if (post) {
          res.status(200).json({ errcode: 200, message: '创建成功', data: post.id })
        } else {
          res.status(500).json({ errcode: 500, message: '创建失败', data: null })
        }
      } catch (err) {
        res.status(500).json({ errcode: 500, message: '创建失败', data: null })
      }
      break
    case 'PUT':
      try {
        const post = await prisma.post.update({ where: { id: req.body.id }, data: req.body })
        if (post) {
          res.status(200).json({ errcode: 200, message: '更新成功', data: post.id })
        } else {
          res.status(500).json({ errcode: 500, message: '更新失败', data: null })
        }

      } catch (err) {
        res.status(500).json({ errcode: 500, message: '更新失败', data: null })
      }
      break
    case 'DELETE':
      try {
        const post = await prisma.post.delete({ where: { id: req.body.id } })
        if (post) {
          res.status(200).json({ errcode: 200, message: '删除成功', data: post.id })
        } else {
          res.status(500).json({ errcode: 500, message: '删除失败', data: null })
        }
      } catch (err) {
        res.status(500).json({ errcode: 500, message: '删除失败', data: null })
      }
      break
    default:
      res.status(500).json({ errcode: 500, message: '请求方式错误', data: null })
  }
}
