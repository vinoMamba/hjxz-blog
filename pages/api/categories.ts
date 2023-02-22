import type { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../types'
import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Category[] | null>>
) {
  if (req.method !== 'GET') return res.status(405).json({ errcode: 405, data: null, message: 'method not allowed' })
  const categories = await prisma.category.findMany({})
  return categories
    ? res.status(200).json({ errcode: 0, data: categories, message: 'ok' })
    : res.status(404).json({ errcode: 404, data: [], message: 'not found' })
}
