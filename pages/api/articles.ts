import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { Article } from '@prisma/client'

/**
 *  GET /api/posts?categoryId=1
 *  不传 categoryId 则返回所有已发布的文章
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Article[] | null>>
) {

  req.headers['Content-Type'] = 'application/json'
  if (req.method !== 'GET') return res.status(405).json({ errcode: 405, data: null, message: 'method not allowed' })
  const { categoryId } = req.query
  const allArticles = await prisma.article.findMany({
    where: {
      categoryId: Number(categoryId) || undefined,
      isPublished: true
    }
  })
  return allArticles
    ? res.status(200).json({ errcode: 0, data: allArticles, message: 'ok' })
    : res.status(404).json({ errcode: 404, data: [], message: 'not found' })
}
