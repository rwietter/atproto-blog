import { blogAdapter } from '@/adapters/secondary/blog/blogAdapter'
import { createBlogService } from '@/application/blogService'
import { isFailure } from '@/common/fp/Result'
import { makeSeo } from '@/ui/components/SEO/makeSeo'
import { BlogPosts } from '@/ui/modules/blog'
import type { Metadata } from 'next'

const atProtoRepo = blogAdapter()
const blogService = createBlogService(atProtoRepo)

const Page = async () => {
  const data = await blogService.getBlogData()

  if (isFailure(data))
    return <p>Ops... Something went wrong. Please, try again later.</p>

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
