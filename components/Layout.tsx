import { useEffectOnce } from "@/hooks/useEffectOnce"
import { ready, runtime } from 'dingtalk-jsapi'
import { useRouter } from "next/router"
import useSwr from 'swr'
import { FC, useState } from "react"

type Props = {
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const [code, setCode] = useState<string>('')
  const router = useRouter()
  function getCorpIdFromUrl() {
    const asPath = router.asPath
    if (asPath) {
      const matchStr = asPath.match(/corpId=(\w+)/)
      if (matchStr) {
        return matchStr[1]
      }
    }
  }
  useEffectOnce(() => {
    const corpId = getCorpIdFromUrl()
    if (corpId) {
      ready(async function () {
        try {
          const { code } = await runtime.permission.requestAuthCode({ corpId })
          setCode(() => code)
        } catch (error) {
          console.error(error)
        }
      })
    }
  })
  const fetcher = async () => {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ code }) })
    if (!res.ok) {
      throw new Error('登录失败')
    }
    return res.json()
  }
  const { data, error } = useSwr(code ? '/api/login' : null, fetcher, { revalidateOnFocus: false })
  if (error) {
    return <div>{error.message}</div>
  }
  if (!data) {
    return <div>loading.....</div>
  }
  return (
    <>
      {data?.data?.name}
      {children}
    </>
  )
}
