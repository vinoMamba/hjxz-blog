import Head from 'next/head'
import { Card, Avatar } from 'antd'
import { BlogList } from '@/components/BlogList'
import { useSWRConfig } from 'swr'

const UserPage = () => {
  const config = useSWRConfig()
  const userInfo = config.fallbackData?.userInfo as User
  const postList: BlogItem[] = Array.from({ length: 20 }).map((_, index) => {

    return {
      id: `00${index + 1}`,
      title: '如何运营个人技术博客',
      content: '本篇和大家聊聊如何运营个人技术博客，定位下做技术写作的目的，有哪些交流平台和输出方式，如何把控内容质量，整理了一些写作技巧和自己常用的写作工具，最后分享下如何在有限的时间里合理安排保证写作与工作的平衡。',
      createdAt: '1天前',
      author: { userId: '001', name: 'Vino', avatar: '', email: '', title: '前端工程师' },
      tags: [{ id: '001', name: '技术' }, { id: '002', name: '写作' }],
    }
  })
  return (
    <>
      <Head>
        <title>个人中心</title>
      </Head>
      <main className='m-auto mt-72' style={{ maxWidth: '1200px' }}>
        <Card>
          <div className='flex items-center select-none'>
            <Avatar src={userInfo?.avatar} size={64} />
            <div className='flex flex-col ml-16'>
              <span className='text-20 font-500'>{userInfo?.name}</span>
              <span className='text-#8a919f mt-16'>{userInfo?.title}</span>
            </div>
          </div>
        </Card>
        <Card className='mt-16'>
          <BlogList list={postList} />
        </Card>
      </main>
    </>
  )
}
export default UserPage
