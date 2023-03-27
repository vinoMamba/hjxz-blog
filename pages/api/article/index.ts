import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<null>>
) {
  req.headers['Content-Type'] = 'application/json'
  switch (req.method) {
    case 'POST':
      const { title, content, isPublished, authorId, categoryId } = JSON.parse(req.body)
      console.log(typeof req.body)
      try {
        await prisma.article.create({
          data: {
            title,
            content,
            isPublished,
            authorId,
            categoryId,
          },
        })
        res.status(200).json({ errcode: 0, message: 'success', data: null })
      } catch (error) {
        console.log(error)
        res.status(400).json({ errcode: 1, message: 'failed', data: null })
      }
      break
    case 'PUT':
      break
    case 'DELETE':
      break
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}
