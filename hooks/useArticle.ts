import { Article } from '@prisma/client'
import useSwr, { useSWRConfig } from 'swr'

export function useArticle({ categoryId }: { categoryId?: number }) {
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
  const { data, error } = useSwr<Result<Article[]>>(
    () => categoryId ? `/api/articles?categoryId=${categoryId}` : '/api/articles',
    (url: string) => fetcher(url), { revalidateOnFocus: false })
  return {
    articles: data?.data ?? [],
    error,
  }
}
