import 'bytemd/dist/index.min.css'
import { Editor } from '@bytemd/react'
import { useState } from 'react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import zoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import 'highlight.js/styles/vs.css'
import 'juejin-markdown-themes/dist/smartblue.min.css'

const plugins = [
  gfm(),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  zoom(),
  mermaid()
]
export const ByteEditor = () => {
  const [value, setValue] = useState('Hello, **World**!')
  function handleChange(v: string) {
    setValue(v)
  }
  return (
    <div>
      <Editor
        plugins={plugins}
        value={value} onChange={handleChange} />
    </div>
  )
}
