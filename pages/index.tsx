import { Category } from '@/components/Category'
import Menu from '@/components/Menu'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex justify-center border border-red mt-16'>
        <div className='border border-black grow h-screen'>
          <Category />
          <ul>
          </ul>
        </div>
        <Menu />
      </main>
    </>
  )
}
