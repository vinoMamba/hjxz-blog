import dynamic from 'next/dynamic'

const DynamicEditor = dynamic(
  () => import('@/components/Editor'),
  { ssr: false, suspense: true, }
)
const Article = () => {
  return (
    <DynamicEditor />
  )
}
export default Article
