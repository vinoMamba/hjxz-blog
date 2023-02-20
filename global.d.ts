import { PrismaClient } from "@prisma/client"
import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    hover?: string
  }
}

declare global {
  var prisma: PrismaClient
}
export { }


