import { Result, UserInfo } from '@/pages/types'
import useSwr from 'swr'

export function useUser(code: string) {
  const fetcher = async () => {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ code }) })
    if (!res.ok) {
      throw new Error('登录失败')
    }
    return res.json()
  }
  const { data, error } = useSwr<Result<UserInfo>>(code ? '/api/login' : null, fetcher, { revalidateOnFocus: false })
  return {
    data: data?.data,
    error,
  }
}
