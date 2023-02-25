import dynamic from 'next/dynamic'

const DynamicEditor = dynamic(
  () => import('@/components/Editor'),
  { ssr: false, suspense: true, }
)
const Article = () => {
  return (
    <main className=''>
      <header className='flex h-64 justify-between items-center border-b'>
        <input type="text" className='mr-auto h-full w-full outline-none pl-32' placeholder='输入文章标题...' />
        <div className='flex items-center justify-start w-320'>
          <button className='h-32 flex items-center justify-center px-16 py-2 border border-#1d7dfa text-#1d7dfa mr-16'>草稿</button>
          <button className='h-32 flex items-center justify-center px-16 py-2 bg-#1d7dfa text-white'>发布</button>
        </div>
      </header>
      <DynamicEditor />
    </main>
  )
}
export default Article
