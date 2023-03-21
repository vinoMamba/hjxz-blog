import Image from "next/image"
import { useRouter } from "next/router"
import { Avatar, Dropdown, MenuProps, Button } from 'antd'

const Nav = () => {
  const router = useRouter()
  const items: MenuProps["items"] = [
    {
      key: '0', label: (
        <span className='flex items-center' onClick={() => router.push('/user')}>
          个人中心
        </span>
      )
    },
  ]
  return (
    <nav
      style={{
        backdropFilter: 'blur(20px)',
        letterSpacing: '1px',
        backgroundColor: 'transparent',
        boxShadow: '0 2px 4px rgb(0 0 0 / 12%)'
      }}
      className="h[64px] w-full position-fixed left-0 top-0 z-11 px-24 text-16 font-400">
      <div
        style={{
          maxWidth: '1200px'
        }}
        className="m-auto flex justify-between items-center p-8">
        <div
          onClick={() => router.push('/')}
          className='flex items-center cursor-pointer'>
          <Image
            src="/logo.svg"
            alt="logo"
            width={36}
            height={36}
          />
          <h1 className='flex flex-col justify-center ml-4 '>
            <span className='text-12 text-gray-5 font-italic'>HJ-Blog</span>
            <span className='text-black op-80 mt-4'>技术博客</span>
          </h1>
        </div>
        <div className="flex items-center">
          <Button className="mr-32" type="dashed" onClick={() => router.push('/article')}>写文章</Button>
          <Dropdown menu={{ items }} placement="bottomRight" >
            <Avatar />
          </Dropdown>
        </div>
      </div>
    </nav >
  )
}

export default Nav
