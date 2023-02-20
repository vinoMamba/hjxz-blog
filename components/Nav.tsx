import Image from 'next/image'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'

const Nav = () => {
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
  return (
    <nav className="flex items-center border-b">
      <main className='m-auto bg-transparent w-1200 flex justify-between items-center p-8'>
        <Image
          src="/logo.svg"
          alt="logo"
          width={36}
          height={36}
        />
        <div className='cursor-pointer position-relative'>
          <span
            onClick={() => setHover(!hover)}
            hover="border-black bg-#f5f5f5"
            className='border border-slate rounded-4 px-4'>王 鑫</span>
          <animated.div className='border bg-#f5f5f5  overflow-hidden  position-absolute right-0 flex justify-center p-4' style={spring}>
            <span>
              个人中心
            </span>
          </animated.div>
        </div>
      </main>
    </nav >
  )
}

export default Nav
