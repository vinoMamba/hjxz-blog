import { Article, Category } from "@prisma/client"
import { FC, useState } from "react"
import { Radio, Card, Button, Form, message, Input } from "antd"
import { useRouter } from "next/router"

const { TextArea } = Input;

type Props = {
  setOpen: (v: boolean) => void
  params: Partial<Article>
  categoryList: Category[]
}
export const PublishCard: FC<Props> = (props) => {
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState('');
  function onChange(e: any) {
    setCategory(e.target.value)
  }
  async function publish() {
    try {
      const publishParams = {
        ...props.params,
        description,
        categoryId: category,
        isPublished: true
      }
      console.log(publishParams)
      const result = await fetch('/api/article', {
        method: 'POST',
        body: JSON.stringify(publishParams)
      })
      if (result.ok) {
        messageApi.success('发布成功')
        props.setOpen(false)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {contextHolder}
      < Card bordered={false} >
        <Form
          name="publishArticle"
          onFinish={publish}
        >
          <Form.Item required={true}>
            <Radio.Group onChange={onChange} value={category}>
              {props.categoryList.map(item => {
                return (
                  <Radio value={item.id} key={item.id}>{item.name}</Radio>
                )
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <TextArea rows={4} placeholder="请输入文章的简要描述" maxLength={6} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item className="flex justify-end gap-4">
            <Button>取消</Button>
            <Button type="primary" htmlType="submit">
              确定并发布
            </Button>
          </Form.Item>
        </Form>
      </Card >
    </>
  )
}
