import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { PostType } from '../../types'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

interface PropsTypes {
  post: PostType
  morePosts: any
  preview: any
}

export default function Post({ post }: PropsTypes) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return null
  }

  return <h1>{post.title}</h1>
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false
}) => {
  const data = await getPostAndMorePosts(params.slug, preview)
  const content = await markdownToHtml(data?.post?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data?.post,
        content
      },
      morePosts: data?.morePosts
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post: PostType) => `/posts/${post.slug}`) || [],
    fallback: true
  }
}
