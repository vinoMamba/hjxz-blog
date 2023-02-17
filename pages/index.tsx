import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-20 px-12 text-center flex flex-col items-center gap-20px text-red-400">
        <h1>UnoCss</h1>
      </main>
    </>
  )
}
