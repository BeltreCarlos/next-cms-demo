import { FunctionComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import { getAllPostsForHome } from '../lib/api'
import { PostType } from '../types'

interface PropsTypes {
  allPosts: PostType[]
}

const Container = styled.div`
  background-color: pink;
`

const Home: FunctionComponent<PropsTypes> = ({ allPosts }) => {
  const mainPost = allPosts[0]

  return (
    <Container className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link as={`/posts/${mainPost.slug}`} href="/posts/[slug]">
          <a>{mainPost.title}</a>
        </Link>
      </main>

      <footer></footer>
    </Container>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts }
  }
}

export default Home
