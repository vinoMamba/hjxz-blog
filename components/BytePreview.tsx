import { Viewer } from '@bytemd/react'
import { FC } from 'react'
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
  content: string
}
export const BytePreview: FC<Props> = (props) => {
  return (
    <div>
      <Viewer
        plugins={plugins}
        value={props.content} />
    </div>
  )
}
