import Head from 'next/head'
import useSwr from 'swr'

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
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      </main>
    </>
  )
}
