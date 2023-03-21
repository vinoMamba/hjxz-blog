import Image from "next/image"
import { useRouter } from "next/router"

const Nav = () => {
  const router = useRouter()
  return (
    <nav
      className="flex justify-between items-center h[64px] w-full position-fixed left-0 top-0 z-11 px-24 text-16 font-400 nav-bgf bg-transparent nav-letter nav-bs">
      <div className='flex items-center cursor-pointer'>
        <Image
          onClick={() => router.push('/')}
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
      <div>

      </div>
    </nav >
  )
}

export default Nav
