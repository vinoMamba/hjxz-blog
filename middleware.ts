// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from './shared/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return NextResponse.next()
  // if (authorization) {
  //   const token = authorization?.split(' ')[1]
  //   if (token) {
  //     try {
  //       const userInfo = await verify(token)
  //       if (userInfo) {
  //         console.log('userInfo', userInfo)
  //         const requestHeaders = new Headers(request.headers)
  //         requestHeaders.set('email', userInfo.userId)
  //         return NextResponse.next({
  //           request: {
  //             headers: requestHeaders
  //           }
  //         })
  //       } else {
  //         return NextResponse.json({ code: 401, message: 'token无效' }, { status: 401 })
  //       }
  //     } catch (error) {
  //       return NextResponse.json({ code: 500, message: 'token解析失败' }, { status: 500 })
  //     }
  //   }

  // }
  // return NextResponse.json({ code: 401, message: '请先登录' }, { status: 401 })
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/posts']
}
