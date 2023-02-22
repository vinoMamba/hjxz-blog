import { Category } from '@/components/Category'
import Menu from '@/components/Menu'
import Head from 'next/head'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export const CategoryContext = createContext<{ category: number, setCategory: Dispatch<SetStateAction<number>> } | null>(null)

export default function Home() {
  const [category, setCategory] = useState(-1)
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
            <ul>
              <li>{category}</li>
            </ul>
          </div>
        </CategoryContext.Provider>
        <Menu />
      </main>
    </>
  )
}
