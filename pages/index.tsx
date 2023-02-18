import Head from 'next/head'
import { ready, runtime } from 'dingtalk-jsapi'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useEffectOnce } from '@/hooks/useEffectOnce'
export default function Home() {
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
          window.sessionStorage.setItem('code', code)
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
      <main className="py-20 px-12 text-center flex flex-col items-center gap-20px text-red-400">
        <h1>UnoCss</h1>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
    }
  }
}
