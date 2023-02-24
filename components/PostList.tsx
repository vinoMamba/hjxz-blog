import { usePosts } from '@/hooks/usePosts'
import { CategoryContext } from '@/pages'
import { useContext } from 'react'

export const PostList = () => {
  const { category } = useContext(CategoryContext)!
  const { posts } = usePosts({ categoryId: category })
  return (
    <div>
      {posts && posts.length > 0 ? posts.map((p) => {
        return (
          < div key={p.id}> {p.title}</div>
        )
      }) : <div>暂无数据</div>}
    </div>
  )
}
