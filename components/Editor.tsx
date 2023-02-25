import { useEffect, useRef, useState } from "react"
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
const Editor = () => {
  const [value, setValue] = useState('#标题') // 文章内容
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const editorInstance = editor.create(ref.current, {
      value,
      language: 'markdown',
      minimap: { enabled: false },
      theme: 'vs-dark',
    })
    editorInstance.onDidChangeModelContent((e) => {
      setValue(editorInstance.getValue())
    })
  }, [])
  return (
    <div className="h-screen" ref={ref}></div>
  )
}

export default Editor
