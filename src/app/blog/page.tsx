import { getPosts, getProfile } from '@/adapters/atproto'
import type { WhtwndBlogFields } from '@/adapters/atproto/atproto'
import { makeSeo } from '@/adapters/ui/components/SEO/makeSeo'
import { BlogPosts } from '@/adapters/ui/modules/blog'
import {
  Failure,
  type Result,
  Success,
  isFailure,
} from '@/core/common/fp/Result'
import type { Metadata } from 'next'
import generateRssFeed from 'utils/feed-rss'

const getData = async (): Promise<Result<WhtwndBlogFields>> => {
  try {
    const [postsResult, profileResult] = await Promise.all([
      getPosts(undefined),
      getProfile(),
    ])

    const postsFiltered = postsResult.filter(
      ({ content }) => !content?.startsWith('NOT_LIVE'),
    )

    const postsShortened = postsFiltered.map((post) => ({
      ...post,
      content: post.content?.slice(0, 300),
    }))

    const data = { posts: postsShortened, profile: profileResult }

    await generateRssFeed({ posts: postsFiltered, profile: profileResult })

    return Success<WhtwndBlogFields>(data)
  } catch (error) {
    console.error(error)
    return Failure(new Error('Failed to fetch posts'))
  }
}

export const metadata: Metadata = makeSeo({
  title: 'Blog | Maurício Witter | Software Developer',
  description:
    'My blog, where I write about my experiences, my projects, and my life. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/blog',
  ogText:
    'My blog, where I write about my experiences, my projects, and my life. :)',
  abstract:
    'My blog, where I write about my experiences, my projects, and my life.',
  keywords: 'blog, experiences, projects, life',
})

const jsonLd = {
  type: 'Blog',
  authorName: 'Maurício Witter',
  url: 'https://rwietter.dev/blog',
  title: 'Blog | Maurício Witter | Software Developer',
  description:
    'My blog, where I write about my experiences, my projects, and my life. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
}

const Page = async () => {
  const data = await getData()

  if (isFailure(data)) {
    return <p>Ops... Something went wrong. Please, try again later.</p>
  }

  return (
    <>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPosts posts={data.value.posts} />
    </>
  )
}

export default Page
