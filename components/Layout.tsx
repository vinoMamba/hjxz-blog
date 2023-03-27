import { FC, useState } from "react"
import { useRouter } from "next/router"
import { useEffectOnce } from "@/hooks/useEffectOnce"
import { ready, runtime } from 'dingtalk-jsapi'
import { useLogin } from "@/hooks/useLogin"
import { LoadingPage } from "./LoadingPage"
import { SWRConfig } from 'swr'

type Props = {
  children: React.ReactNode
}

interface FallbackData {
  userInfo: User
  token: string
}


export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [code, setCode] = useState<string>('')
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
          setCode(code)
        } catch (error) {
          console.error(error)
        }
      })
    }
  })
  const { userInfo, token, error } = useLogin(code)
  if (error) {
    return < div >error</div >
  }
  if (!userInfo) {
    return <LoadingPage />
  }
  return (
    <SWRConfig value={{
      fallbackData: {
        userInfo,
        token
      } as FallbackData
    }}>
      {children}
    </SWRConfig>
  )
}
