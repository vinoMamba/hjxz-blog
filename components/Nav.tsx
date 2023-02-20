import Image from 'next/image'
import { animated, useSpring } from '@react-spring/web'
import { useRef } from 'react'

const UserIcon = () => {
  const divRef = useRef<HTMLDivElement>(null)
  //获取div的宽度
  const divWidth = divRef.current?.offsetWidth ?? 0
  const [props, api] = useSpring(() => {
    return {
      x: -divWidth,
    }
  }, [])
  return (
    <>
      <span
        hover='b-black'
        className='p-1 px-2 cursor-pointer border b-gray border-rd'>
        王 鑫
      </span>
      <animated.div className="h-screen  fixed right-0 top-0 bg-blue" ref={divRef}>
        <div>个人中心</div>
      </animated.div>
    </>
  )
}

const Nav = () => {
  const toggle = useRef(false)
  const [props, api] = useSpring(
    () => ({
      x: -100,
    }), [])
  const userClick = () => {
    api.start({ x: toggle.current ? 0 : 100 })
    toggle.current = !toggle.current
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-#fafafa p-2 px-4 ">
      <Image
        src="/logo.svg"
        alt="logo"
        width={36}
        height={36}
      />
      <UserIcon />
    </nav>
  )
}

export default Nav
