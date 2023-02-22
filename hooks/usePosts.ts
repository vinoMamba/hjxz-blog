import { Result } from '@/pages/types'
import { Post } from '@prisma/client'
import useSwr from 'swr'

export function usePosts({ categoryId }: { categoryId?: number }) {
  const fetcher = async (categoryId?: number) => {
    console.log('fetcher')
    console.log(categoryId)
    const res = await fetch('/api/posts', { method: 'GET' })
    if (!res.ok) {
      throw new Error('获取博客失败')
    }
    return res.json()
  }
  const {
    data,
    error,
    mutate
  } = useSwr<Result<Post[]>>(
    ['/api/posts', categoryId],
    ([_, categoryId]: [string, number]) => fetcher(categoryId), { revalidateOnFocus: false })
  return {
    posts: data?.data,
    error,
    updatePosts: mutate
  }
}
