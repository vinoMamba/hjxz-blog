import { ArticleItem, Result } from '@/types'
import useSwr, { useSWRConfig } from 'swr'

export function useArticles({ categoryId, authorId, isPublished }: { categoryId?: number, authorId?: string, isPublished?: boolean }) {
  const config = useSWRConfig()
  const token = config.fallbackData?.token
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    )
    if (!res.ok) {
      throw new Error('获取博客失败')
    }
    return res.json()
  }
  const { data, error } = useSwr<Result<ArticleItem[]>>(
    () => {
      const params = new URLSearchParams()
      if (categoryId) {
        params.append('categoryId', categoryId.toString())
      }
      if (authorId) {
        params.append('authorId', authorId)
      }
      if (isPublished) {
        params.append('isPublished', isPublished.toString())
      }
      return `/api/articles?${params.toString()}`
    },
    (url: string) => fetcher(url), { revalidateOnFocus: false })
  return {
    articles: data?.data ?? [],
    error,
  }
}

