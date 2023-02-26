import { evaluate } from '@mdx-js/mdx'
import { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'

export const compileMdx = async (value: string) => {
  try {
    const { default: Content } = await evaluate(value, {
      ...runtime,
      Fragment: Fragment,
      format: 'mdx',
    })
    console.log(Content)
    const html = ReactDOMServer.renderToString(<Content />)
    return [html, null]
  } catch (error: any) {
    return ['', error]
  }
}
