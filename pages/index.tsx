import Head from 'next/head'
import { ready, runtime } from 'dingtalk-jsapi'
import { useRouter } from 'next/router'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import useSwr from 'swr'
import { useState } from 'react'

function UserInfo(props: { code: string }) {
  const  fetcher= () => fetch('/api/login', { method: 'POST', body: JSON.stringify({ code: props.code }) }).then(res => res.json())
  const { data, error } = useSwr('/api/login',fetcher)
  if (error) {
    return <div>{error.message}</div>
  } else {
    return <div>{data?.data?.name}</div>
  }
}

export default function Home() {
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
  useEffectOnce(async () => {
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
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {code && <UserInfo code={code} />}
      </main>
    </>
  )
}
