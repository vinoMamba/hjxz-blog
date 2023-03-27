import Head from 'next/head'
import { Card, Avatar } from 'antd'
import { useSWRConfig } from 'swr'
import { ArticleList } from '@/components/ArticleList'
import { useArticle } from '@/hooks/useArticle'

const UserPage = () => {
  const config = useSWRConfig()
  const userInfo = config.fallbackData?.userInfo as User
  const { articles } = useArticle({})
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
          <ArticleList list={articles} />
        </Card>
      </main>
    </>
  )
}
export default UserPage
