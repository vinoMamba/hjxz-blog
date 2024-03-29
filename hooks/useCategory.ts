import { Result } from '@/types'
import { Category } from '@prisma/client'
import useSwr from 'swr'

export function useCategory() {
  const token = localStorage.getItem('token')
  const fetcher = async () => {
    const res = await fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) {
      throw new Error('获取分类失败')
    }
    return res.json()
  }
  const { data, error } = useSwr<Result<Category[]>>('/api/categories', fetcher, { revalidateOnFocus: false })
  return {
    categories: data?.data,
    error,
  }
}
