import { Category } from '@/components/Category'
import Menu from '@/components/Menu'
import { PostList } from '@/components/PostList'
import Head from 'next/head'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

export const CategoryContext = createContext<{ category: number | undefined, setCategory: Dispatch<SetStateAction<number | undefined>> } | null>(null)

export default function Home() {
  const [category, setCategory] = useState<undefined | number>(undefined)
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex justify-center border border-red mt-16'>
        <CategoryContext.Provider value={{
          category,
          setCategory
        }}>
          <div className='border border-black grow h-screen'>
            <Category />
            <PostList />
          </div>
        </CategoryContext.Provider>
        <Menu />
      </main>
    </>
  )
}
