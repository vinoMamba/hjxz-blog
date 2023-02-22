import { Result } from '@/pages/types'
import { Post } from '@prisma/client'
import useSwr from 'swr'

export const usePosts = () => {
  const fetcher = async ({ categoryId, tagId }: { categoryId?: number, tagId?: number }) => {
    const res = await fetch('/api/posts', { method: 'GET', body: JSON.stringify({ categoryId, tagId }) })
    if (!res.ok) {
      throw new Error('获取博客失败')
    }
    return res.json()
  }
  const { data, error } = useSwr<Result<Post[]>>('/api/categories', fetcher, { revalidateOnFocus: false })
  function updatePosts({ categoryId, tagId }: { categoryId?: number, tagId?: number }) {
    fetcher({ categoryId, tagId })
  }
  return {
    posts: data?.data,
    error,
    updatePosts
  }
}
