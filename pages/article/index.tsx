import { ByteEditor } from "@/components/ByteEditor"
import { Input, Button } from "antd"
import { useState } from "react"

const Article = () => {
  const [value, setValue] = useState('')
  function publishArticle() {
    console.log(value)
  }
  return (

    <main>
      <header className='p-16 px-32 bg-white flex items-center border'>
        <Input bordered={false} placeholder='请输入文章标题' size="large" className="flex-1 text-24 font-500" />
        <div>
          <Button type='primary'>保存</Button>
          <Button type="dashed" className="ml-16" onClick={publishArticle}>发布</Button>
        </div>
      </header>
      <ByteEditor value={value} setValue={setValue} />
    </main>
  )
}
export default Article
