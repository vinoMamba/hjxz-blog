import { Spin } from "antd"
export const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      < Spin size="large" tip="Loading..." />
    </div>
  )
}
