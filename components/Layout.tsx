import { useEffectOnce } from "@/hooks/useEffectOnce"
import { ready, runtime } from 'dingtalk-jsapi'
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { SWRConfig } from "swr"
import { verify } from '@/shared/jwt'

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
  const { data, error } = useUser(code)
  if (error) {
    return <div>{error.message}</div>
  }
  if (!data) {
    return <div>loading.....</div>
  }
  if (data) {
    window.localStorage.setItem('jwt', JSON.stringify(data.jwt.token))
  }
  return (
    <SWRConfig value={{
      fallbackData: {
        userInfo: data.userInfo
      }
    }}>
      {children}
    </SWRConfig>
  )
}
