import { Article } from '@prisma/client'
import useSwr, { useSWRConfig } from 'swr'

export function useArticles({ categoryId }: { categoryId?: number }) {
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
    () => categoryId !== 0 ? `/api/articles?categoryId=${categoryId}` : '/api/articles',
    (url: string) => fetcher(url), { revalidateOnFocus: false })
  return {
    articles: data?.data ?? [],
    error,
  }
}

export function useAddArticle(params: Partial<Article>) {
  const { fallbackData } = useSWRConfig()
  const token = fallbackData?.token
  params.authorId = fallbackData?.userInfo.userId
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params)
    }
    )
    if (!res.ok) {
      throw new Error('获取Token失败')
    }
    return res.json()
  }
  const { error } = useSwr<Result<null>>(
    () => '/api/article',
    (url: string) => fetcher(url), { revalidateOnFocus: false })
  return {

    error,
  }
}
