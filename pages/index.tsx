import { ArticleList } from "@/components/ArticleList";
import Menu from "@/components/Menu";
import { useArticle } from "@/hooks/useArticle";
import { Card } from "antd";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { makeSerializable } from "@/shared/utils";
import { createContext, useState } from "react";

export const ArticleContext = createContext<{
  current: number
  setCurrent: (id: number) => void
} | null>(null)

type Props = {
  categories: Category[]
}
export default function Home(props: Props) {
  const [current, setCurrent] = useState(0)
  const { articles } = useArticle({ categoryId: current })
  return (
    <ArticleContext.Provider value={{
      current,
      setCurrent
    }}>
      <main
        style={{
          maxWidth: '1200px'
        }}
        className="h-screen m-auto items-start overflow-auto lg:flex ">
        <Menu categories={props.categories} />
        <div
          className='h-screen overflow-auto ml-8 lg:pt-72 w-full'
        >
          <Card>
            <ArticleList list={articles} />
          </Card>
        </div>
      </main>
    </ArticleContext.Provider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await prisma.category.findMany({})
  return {
    props: {
      categories: makeSerializable(categories) ?? []
    }
  }
}
