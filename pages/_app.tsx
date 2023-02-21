import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { Layout } from '@/components/Layout'
import Nav from '@/components/Nav'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Nav/>
      <Component {...pageProps} />
    </Layout>
  )
}
