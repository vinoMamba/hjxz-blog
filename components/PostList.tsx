import { FC } from "react"
import { Card, Tabs, TabsProps } from "antd"

interface PostListProps {
  className?: string
}
const PostList: FC<PostListProps> = (props) => {
  const items: TabsProps['items'] = [
    { key: '1', label: '最新' },
    { key: '2', label: '热门' },
  ]

  function tabChange(key: string) {
    console.log(key)
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

interface PostProps {
  list: BlogItem[]
}
const BlogList: FC<PostProps> = (props) => {
  return (
    <ul>
      {props.list.map(item => {
        return (
          <li
            key={item.id}
            className='cursor-pointer mb-8 p-8 border-b border-b-solid rounded-8  border-#f2f3f5 hover:bg-#f2f3f5' >
            <div className="flex items-center mb-8 gap-8">
              <span className="text-#515767 text-14">{item.author.name}</span>
              <span className="text-#8a919f text-13">{item.createdAt}</span>
              <span className="text-#8a919f text-13">{item.tags.map(t => t.name).join('.')}</span>
            </div>
            <div>
              <span className="text-16 font-500">{item.title}</span>
              <p
                className="text-#8a919f text-14 mt-8">{item.content}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
