import { useCategory } from '@/hooks/useCategory'
import { CategoryContext } from '@/pages'
import { useState, useContext } from 'react'


type CategoryItemProps = {
  children: React.ReactNode
  current: number
  index: number
  onClick: () => void
}

const CategoryItem = ({ children, current, index, onClick }: CategoryItemProps) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: current === index ? '#ebebeb' : '#fff',
        color: '#171717'
      }}
      hover='text-#171717'
      className='cursor-pointer px-12 py-8  rounded-full text-#666'>{children}</span>
  )
}

export const Category = () => {
  const { category, setCategory } = useContext(CategoryContext)!
  const { categories, error } = useCategory()
  if (error) {
    return <div>{error.message}</div>
  }
  if (!categories) {
    return <div>loading.....</div>
  }
  return (
    <div className='flex gap-8 justify-start items-center border-b p-4'>
      <CategoryItem current={category} index={-1} onClick={() => setCategory(-1)} >全部</CategoryItem>
      {categories.map((c) => {
        return (
          <CategoryItem
            key={c.id}
            current={category}
            index={c.id}
            onClick={() => setCategory(c.id)} >{c.name}</CategoryItem>
        )
      })}
    </div>
  )
}
