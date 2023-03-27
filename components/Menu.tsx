import { Category } from "@prisma/client"
import { Card } from "antd"
import { FC, useState } from "react"

type Props = {
  categories: Category[]
}

const Menu: FC<Props> = (props) => {
  const [current, setCurrent] = useState(-1)
  const categoryList = [{ id: -1, name: '全部' }].concat(props.categories)
  function handleClick(id: number) {
    setCurrent(id)
  }
  return (
    <Card className="mt-72 lg:w[300px]">
      <ol className="flex gap-8 m-0 lg:flex-col">
        {categoryList.map(item => {
          return (
            <li
              onClick={() => handleClick(item.id)}
              key={item.id}
              color={current === item.id ? '#1e80fe' : '#000'}
              bg={current === item.id ? '#eaf2ff' : '#fff'}
              className='flex items-center cursor-pointer p-8 my-4 rounded-md hover:bg-#f7f8fa hover:text-#1e80fe'>
              <span className='ml-4'>{item.name}</span>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
export default Menu
