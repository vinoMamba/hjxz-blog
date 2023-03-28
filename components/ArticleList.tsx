import { Result, Button } from "antd"
import { FC } from "react"
import { useRouter } from "next/router"
import { ArticleItem } from "@/types"


interface PostProps {
  list: ArticleItem[]
}
export const ArticleList: FC<PostProps> = (props) => {
  const router = useRouter()
  return (
    <ul className="select-none">
      {props.list.length === 0 && <li className="text-center text-#515767 text-14">
        <Result
          title="暂无数据"
          extra={<Button type="dashed" onClick={() => router.push('/article')}>水一篇博客</Button>}
        />
      </li>}
      {props.list.map(item => {
        return (
          <li
            key={item.id}
            className='cursor-pointer mb-8 p-8 border-b border-b-solid rounded-8  border-#f2f3f5 hover:bg-#f2f3f5' >
            <div className="flex items-center mb-8 gap-8">
              <span className="text-#515767 text-14">{item.authorName}</span>
              <span className="text-#8a919f text-13">2023</span>
            </div>
            <div>
              <span className="text-16 font-500">{item.title}</span>
              <p
                className="text-#8a919f text-14 mt-8">{item.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
