import { Result } from '@/pages/types'
import { Post } from '@prisma/client'
import useSwr from 'swr'

export function usePosts({ categoryId }: { categoryId?: number }) {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    )
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
    () => categoryId ? `/api/posts?categoryId=${categoryId}` : '/api/posts',
    (url: string) => fetcher(url), { revalidateOnFocus: false })
  return {
    posts: data?.data,
    error,
    updatePosts: mutate
  }
}
