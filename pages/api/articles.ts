import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { ArticleItem, Result } from '@/types'

/**
 *  GET /api/posts?categoryId=1&authorId=1&isPublished=true
 *  不传 categoryId 则返回所有已发布的文章
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<ArticleItem[] | null>>
) {

  req.headers['Content-Type'] = 'application/json'
  if (req.method !== 'GET') return res.status(405).json({ errcode: 405, data: null, message: 'method not allowed' })
  const { categoryId, authorId, isPublished } = req.query
  const allArticles = await prisma.article.findMany({
    where: {
      categoryId: categoryId ? Number(categoryId) : undefined,
      authorId: authorId ? authorId as string : undefined,
      isPublished: isPublished ? Boolean(isPublished) : undefined,
    },
  })
  const articleAndAuthor = allArticles.map(async article => {
    const user = await prisma.user.findUnique({ where: { userId: article.authorId } })
    return {
      ...article,
      authorName: user!.name
    }
  })
  const list = await Promise.all(articleAndAuthor)
  return list
    ? res.status(200).json({ errcode: 0, data: list, message: 'ok' })
    : res.status(404).json({ errcode: 404, data: [], message: 'not found' })
}
