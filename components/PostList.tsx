import { usePosts } from '@/hooks/usePosts'
import { CategoryContext } from '@/pages'
import { useContext } from 'react'

export const PostList = () => {
  const { category } = useContext(CategoryContext)!
  const { posts } = usePosts({ categoryId: category })
  return (
    <div>
      {category || '全部'}
      {posts && posts.map((p) => {
        return (
          < div key={p.id}> {p.title}</div>
        )
      })}
    </div>
  )
}
