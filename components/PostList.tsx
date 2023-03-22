import { FC } from "react"
import { Card, Tabs, TabsProps } from "antd"
import { BlogList } from "./BlogList"

interface PostListProps {
  className?: string
}
const PostList: FC<PostListProps> = (props) => {
  const items: TabsProps['items'] = [
    { key: '1', label: '最新' },
    { key: '2', label: '热门' },
  ]

  function tabChange(key: string) {
  }

  const postList: BlogItem[] = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: `00${index + 1}`,
      title: '如何运营个人技术博客',
      content: '本篇和大家聊聊如何运营个人技术博客，定位下做技术写作的目的，有哪些交流平台和输出方式，如何把控内容质量，整理了一些写作技巧和自己常用的写作工具，最后分享下如何在有限的时间里合理安排保证写作与工作的平衡。',
      createdAt: '1天前',
      author: { id: '0101', name: 'vino' },
      tags: [{ id: '001', name: '技术' }, { id: '002', name: '写作' }],
    }
  })
  return (
    <div
      className={`${props.className} h-screen overflow-auto ml-8 lg:pt-72 `}
    >
      <Card>
        <Tabs defaultActiveKey="1" items={items} onChange={tabChange} ></Tabs>
        <BlogList list={postList} />
      </Card>
    </div>
  )
}

export default PostList
