import Image from 'next/image'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const [hover, setHover] = useState(false)
  const spring = useSpring({
    from: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    to: {
      width: hover ? 100 : 0,
      height: hover ? 100 : 0,
      opacity: 1,
    },
  })
  const handleClick = () => {
    router.push('/user')
    setHover(false)
  }
  return (
    <nav className="flex items-center border-b">
      <main className='m-auto bg-transparent w-1200 flex justify-between items-center p-8'>
        <div className='flex items-center cursor-pointer'>
          <Image
            onClick={() => router.push('/')}
            src="/logo.svg"
            alt="logo"
            width={36}
            height={36}
          />
          <h1 className='flex flex-col justify-center ml-4 '>
            <span className='text-12 text-gray-5'>HJ-Blog</span>
            <span>技术博客</span>
          </h1>
        </div>
        <div className='cursor-pointer position-relative'>
          <span
            onClick={() => setHover(!hover)}
            hover="border-black bg-#f5f5f5"
            className='border border-slate rounded-4 px-4'>王 鑫</span>
          <animated.div className='border bg-#f5f5f5  overflow-hidden  position-absolute right-0 flex justify-center p-4' style={spring}>
            <span onClick={handleClick}>个人中心</span>
          </animated.div>
        </div>
      </main>
    </nav >
  )
}

export default Nav
