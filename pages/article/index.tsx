import { readFileSync } from 'fs'
import { GetStaticProps } from 'next'
import { join } from 'path'

type Props = {
  theme: string
}
const Article = (props: Props) => {
  return (
    <main>
      <header className='flex h-64 justify-between items-center border-b'>
        <input type="text" className='mr-auto h-full w-full outline-none pl-32' placeholder='输入文章标题...' />
        <div className='flex items-center justify-start w-320'>
          <button className='h-32 flex items-center justify-center px-16 py-2 border border-#1d7dfa text-#1d7dfa mr-16'>草稿</button>
          <button className='h-32 flex items-center justify-center px-16 py-2 bg-#1d7dfa text-white'>发布</button>
        </div>
      </header>
    </main>
  )
}
export default Article


export const getStaticProps: GetStaticProps = async () => {
  const theme = readFileSync(join(process.cwd(), 'styles', 'theme-1.css'), 'utf-8')
  return {
    props: {
      theme
    }
  }
}
