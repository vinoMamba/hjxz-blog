// see: https://zhuanlan.zhihu.com/p/578507282
import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    bg?: string
    flex?: boolean
    relative?: boolean
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean
  }
}
