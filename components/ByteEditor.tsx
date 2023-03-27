import 'bytemd/dist/index.min.css'
import { Editor } from '@bytemd/react'
import { FC, useState } from 'react'
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

type Props = {
  value: string
  setValue: (v: string) => void
}

export const ByteEditor: FC<Props> = (props) => {
  function handleChange(v: string) {
    props.setValue(v)
  }
  return (
    <div>
      <Editor
        plugins={plugins}
        value={props.value} onChange={handleChange} />
    </div>
  )
}
