import type { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../types'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

/**
 *  GET /api/posts?categoryId=1
 *  不传 categoryId 则返回所有已发布的文章
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Post[] | null>>
) {
  if (req.method !== 'GET') return res.status(405).json({ errcode: 405, data: null, message: 'method not allowed' })
  const { categoryId } = req.query
  const allPosts = await prisma.post.findMany({
    where: {
      categoryId: Number(categoryId) || undefined,
      published: true
    }
  })
  return allPosts
    ? res.status(200).json({ errcode: 0, data: allPosts, message: 'ok' })
    : res.status(404).json({ errcode: 404, data: [], message: 'not found' })
}
