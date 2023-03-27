import { Article } from "@prisma/client"
import { FC } from "react"

interface PostProps {
  list: Article[]
}
export const ArticleList: FC<PostProps> = (props) => {
  return (
    <ul className="select-none">
      {props.list.map(item => {
        return (
          <li
            key={item.id}
            className='cursor-pointer mb-8 p-8 border-b border-b-solid rounded-8  border-#f2f3f5 hover:bg-#f2f3f5' >
            <div className="flex items-center mb-8 gap-8">
              <span className="text-#515767 text-14">{item.authorId}</span>
              <span className="text-#8a919f text-13">2023</span>
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
