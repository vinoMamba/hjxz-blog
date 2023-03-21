import Menu from "@/components/Menu";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <>
      <main
        style={{
          maxWidth: '1200px'
        }}
        className="h-screen m-auto flex items-start overflow-auto">
        <Menu />
        <PostList className='flex-1' />
      </main>
    </>
  )
}
