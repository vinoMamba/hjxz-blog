import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { Layout } from '@/components/Layout'
import Nav from '@/components/Nav'
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Layout>
      {router.pathname !== '/article' && <Nav />}
      <Component {...pageProps} />
    </Layout>
  )
}
