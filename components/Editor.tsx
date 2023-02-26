import { useEffect, useRef, useState } from "react"
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import { compileMdx } from '@/shared/compileMdx'


const Editor = () => {
  const [value, setValue] = useState('#标题') // 文章内容
  const [html, setHtml] = useState('') // 编译后的html
  const ref = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<editor.IStandaloneCodeEditor>()
  useEffect(() => {
    if (!ref.current) return
    editorInstance.current = editor.create(ref.current, {
      language: 'markdown',
      value,
      minimap: { enabled: false },
      theme: 'vs-light',
    })
    editorInstance.current.onDidChangeModelContent(() => {
      setValue(editorInstance.current?.getValue() || '')
    })
    return () => {
      editorInstance.current?.dispose()
    }
  }, [])
  useEffect(() => {
    const asyncFn = async () => {
      const [html, error] = await compileMdx(value)
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
          srcDoc={html}
        ></iframe>
      </div>
    </div>
  )
}

export default Editor
