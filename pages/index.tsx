import Head from 'next/head'
import Nav from '@/components/Nav'
import { useSWRConfig } from 'swr'
import { UserInfo } from './types'


export default function Home() {
  const { fallbackData } = useSWRConfig()
  const userInfo = fallbackData?.userInfo as UserInfo
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        {userInfo.name}
      </main>
    </>
  )
}
