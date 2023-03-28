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
    const publishParams = {
      ...props.params,
      description,
      categoryId: category,
      isPublished: true
    }
    if (!publishParams.title) {
      messageApi.error('文章标题不能为空')
      return
    }
    try {
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
          <Form.Item
            label="文章分类"
            name="category"
            rules={[{ required: true, message: '请选择文章分类' }]}
            required={true}>
            <Radio.Group onChange={onChange} value={category}>
              {props.categoryList.map(item => {
                return (
                  <Radio value={item.id} key={item.id}>{item.name}</Radio>
                )
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="文章摘要"
            name="description"
            rules={[{ required: true, message: '请编辑文章摘要' }]}
            required={true}>
            <TextArea
              rows={4}
              placeholder="编写文章摘要"
              maxLength={200}
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item className="flex justify-end gap-8">
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
