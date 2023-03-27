import { ByteEditor } from "@/components/ByteEditor"
import { PublishCard } from "@/components/PublishCard"
import { makeSerializable } from "@/shared/utils"
import { Article, Category } from "@prisma/client"
import { Input, Button, Popover } from "antd"
import { GetStaticProps } from "next"
import { useState } from "react"
import { useSWRConfig } from "swr"

type Props = {
  categories: Category[]
}

const Article = (props: Props) => {
  const config = useSWRConfig()
  const [params, setParams] = useState<Partial<Article>>({
    title: '',
    content: '',
    isPublished: false,
    authorId: config.fallbackData.userInfo.userId
  })
  const [open, setOpen] = useState(false);

  return (

    <main>
      <header className='p-16 px-32 bg-white flex items-center border'>
        <Input value={params.title} onChange={(v) => setParams({
          ...params,
          title: v.target.value
        })} bordered={false} placeholder='请输入文章标题' size="large" className="flex-1 text-24 font-500" />
        <div>
          <Button type='primary'>保存</Button>
          <Popover
            title="发布文章"
            trigger="click"
            placement="bottomRight"
            open={open}
            content={<PublishCard setOpen={setOpen} params={params} categoryList={props.categories} />}
            onOpenChange={(newOpen) => setOpen(newOpen)}>
            <Button type="dashed" className="ml-16">发布</Button>
          </Popover>
        </div>
      </header>
      <ByteEditor value={params.content!} setValue={
        (v) => setParams({
          ...params,
          content: v
        })
      } />
    </main>
  )
}
export default Article


export const getStaticProps: GetStaticProps = async () => {
  const categories = await prisma.category.findMany({})
  return {
    props: {
      categories: makeSerializable(categories) ?? []
    }
  }
}
