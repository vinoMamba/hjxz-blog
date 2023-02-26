import { evaluate } from '@mdx-js/mdx'
import { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'
import remarkGFM from 'remark-gfm'
import rehypePrismPlus from "rehype-prism-plus";

export const compileMdx = async (value: string) => {
  try {
    const { default: Content } = await evaluate(value, {
      ...runtime,
      Fragment: Fragment,
      format: 'mdx',
      remarkPlugins: [remarkGFM],
      rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }],],
    })
    const html = ReactDOMServer.renderToString(<Content />)
    return [html, null]
  } catch (error: any) {
    return ['', error]
  }
}
