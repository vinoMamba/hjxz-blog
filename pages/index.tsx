import { ArticleList } from "@/components/ArticleList";
import Menu from "@/components/Menu";
import { useArticle } from "@/hooks/useArticle";
import { Card } from "antd";

export default function Home() {
  const { articles } = useArticle({})
  return (
    <>
      <main
        style={{
          maxWidth: '1200px'
        }}
        className="h-screen m-auto items-start overflow-auto lg:flex ">
        <Menu />
        <div
          className='h-screen overflow-auto ml-8 lg:pt-72 w-full'
        >
          <Card>
            <ArticleList list={articles} />
          </Card>
        </div>
      </main>
    </>
  )
}
