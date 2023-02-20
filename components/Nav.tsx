import Image from 'next/image'

const Nav = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-#fafafa px-4">
      <Image
        src="/logo.svg"
        alt="logo"
        width={100}
        height={100}
      />
      <span className='p-1 px-2 cursor-pointer border b-slate border-rd'>王 鑫</span>
    </nav>
  )
}

export default Nav
