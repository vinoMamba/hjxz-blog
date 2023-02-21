import Menu from '@/components/Menu'
import { Post } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import prisma from '@/lib/prisma'
import { makeSerializable } from '@/shared/utils'

type Props = {
  articles: Post[]
}
export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex justify-center border border-red mt-16'>
        <div className='border border-black grow h-screen'>
          <ul>
            {props.articles.map((article) => (
              <li key={article.id}>{article.title}</li>
            ))} </ul>
        </div>
        <Menu />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await prisma.post.findMany()
  return {
    props: {
      articles: makeSerializable(articles)
    }
  }
}
