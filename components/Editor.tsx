import { useEffect, useRef, useState } from "react"
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
const Editor = () => {
  const [value, setValue] = useState('#标题') // 文章内容
  const ref = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<editor.IStandaloneCodeEditor>()
  const previewInstance = useRef<editor.IStandaloneCodeEditor>()
  useEffect(() => {
    if (!ref.current) return
    editorInstance.current = editor.create(ref.current, {
      value,
      language: 'markdown',
      minimap: { enabled: false },
      theme: 'vs-light',
    })

    if (!previewRef.current) return
    previewInstance.current = editor.create(previewRef.current, {
      value,
      language: 'markdown',
      minimap: { enabled: false },
      theme: 'vs-light',
      readOnly: true,
    })

    return () => {
      editorInstance.current?.dispose()
      previewInstance.current?.dispose()
    }
  }, [])
  return (
    <div className="flex justify-between items-center bg-red  h-[calc(100vh-64px)] overflow-auto">
      <div className="w-1/2 bg-#f8f9fa h-full">
        <div className="w-800 m-auto h-full" ref={ref}></div>
      </div>
      <div className="w-1/2 bg-white h-full">
        <div className="w-800 m-auto h-full" ref={previewRef}></div>
      </div>
    </div>
  )
}

export default Editor
