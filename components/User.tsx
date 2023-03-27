import { Avatar, Dropdown, MenuProps } from "antd"
import { useRouter } from "next/router"
import { useSWRConfig } from "swr"

export const UserIcon = () => {
  const config = useSWRConfig()
  const userInfo = config.fallbackData?.userInfo as User
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
    <Dropdown menu={{ items }} placement="bottomRight" >
      <Avatar src={userInfo?.avatar} />
    </Dropdown>
  )
}
