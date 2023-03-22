import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useEffectOnce } from "@/hooks/useEffectOnce"
import { ready, runtime } from 'dingtalk-jsapi'

type Props = {
  children: React.ReactNode
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
          const data = await fetch(`/api/login`, {
            method: 'POST',
            body: JSON.stringify({ code }),
          })
        } catch (error) {
          console.error(error)
        }
      })
    }
  })

  return (
    <>
      {children}
    </>
  )
}
