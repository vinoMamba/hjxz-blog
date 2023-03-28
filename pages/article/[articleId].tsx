import { BytePreview } from "@/components/BytePreview"
import { makeSerializable } from "@/shared/utils"
import { Article, User } from "@prisma/client"
import { Card } from "antd"
import { GetServerSideProps } from "next"

type Props = {
  article: Article | null
  author: User | null
}

const Article = (props: Props) => {
  return (
    <main className='m-auto mt-72' style={{ maxWidth: '1200px' }}>
      <Card>
        {props.article && props.author && <>
          <BytePreview content={props.article.content} />
        </>}
      </Card>
    </main>
  )
}

export default Article

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { articleId } = query
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(articleId)
      },
    })
    const author = await prisma.user.findUnique({
      where: {
        userId: article!.authorId
      },
    })
    return {
      props: {
        article: makeSerializable(article),
        author: makeSerializable(author)
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        article: null,
        author: null
      }
    }
  }
}
