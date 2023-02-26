import { useEffect, useRef, useState } from "react"
import { compileMdx } from '@/shared/compileMdx'
import { createEditor } from "@/shared/monaco"

type Props = {
  theme: string
}
const Editor = (props: Props) => {
  const [value, setValue] = useState('') // 文章内容
  const [html, setHtml] = useState('') // 编译后的html
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const { dispose, getValue, onDidChangeModelContent } = createEditor(ref.current, value)
    onDidChangeModelContent(() => {
      setValue(getValue() || '')
    })
    return () => {
      dispose()
    }
  }, [])
  useEffect(() => {
    const asyncFn = async () => {
      const [html] = await compileMdx(value)
      setHtml(html)
    }
    asyncFn()
  }, [value])
  return (
    <div className="flex justify-between items-center bg-red  h-[calc(100vh-64px)] overflow-auto">
      <div className="w-1/2 bg-#f8f9fa h-full">
        <div className="w-800 m-auto h-full" ref={ref}></div>
      </div>
      <div className="w-1/2 bg-white h-full">
        <iframe
          className="w-800 m-auto h-full"
          sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals"
          srcDoc={`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>${props.theme}</style> 
        </head>
        <body><div class="markdown-body">${html}</div></body>
      </html>`}
        ></iframe>
      </div>
    </div>
  )
}

export default Editor
