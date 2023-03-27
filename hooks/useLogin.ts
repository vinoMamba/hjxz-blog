import useSwr from 'swr'


export function useLogin(code: string) {
  const fetcher = async () => {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ code }) })
    if (!res.ok) {
      throw new Error('登录失败')
    }
    return res.json()
  }
  const { data, error } = useSwr<Result<LoginInfo>>(code ? '/api/login' : null, fetcher, { revalidateOnFocus: false })
  return {
    userInfo: data?.data.userInfo,
    token: data?.data.token,
    error,
  }
}
