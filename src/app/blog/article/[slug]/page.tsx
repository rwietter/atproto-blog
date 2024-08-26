import { blogAdapter } from '@/adapters/secondary/blog/blogAdapter'
import { createBlogService } from '@/application/blogService'
import { Failure, Success, isFailure } from '@/common/fp/Result'
import { getPosts } from '@/infra/api/atproto'
import { makeSeo } from '@/ui/components/SEO/makeSeo'
import ArticleContent from '@/ui/modules/article/content'
import ArticleFooter from '@/ui/modules/article/footer'
import ArticleHeader from '@/ui/modules/article/header'
import styles from '@/ui/modules/article/styles.module.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PagePropTypes = {
  params: { slug?: string }
  searchParams: { rkey?: string }
}

const atProtoRepo = blogAdapter()
const blogpost = createBlogService(atProtoRepo)

const Page = async (props: PagePropTypes) => {
  const { slug } = props.params
  const searchParams = props.searchParams

  if (!searchParams.rkey) return notFound()

  const data = await blogpost.getBlogPost(searchParams.rkey)

  if (isFailure(data)) return notFound()

  const { mdxSource, readingTime, post, profile } = data.value

  const frontmatter = {
    author: profile.displayName,
    title: post.title,
    date: post.createdAt,
    createdAt: post.createdAt,
  }

  const shortedContent = post.content?.slice(0, 300)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id:': 'https://rwietter.dev',
    },
    headline: post.title,
    author: 'Maurício Witter',
    articleBody: post?.content,
    backstory: shortedContent,
    license: 'CC-BY-SA-4.0',
    url: `https://rwietter.dev/blog/article/${slug}?rkey=${searchParams.rkey}`,
    text: shortedContent,
    keywords: 'article, blog, rwietter, web development, programming, tech',
    image: '',
    datePublished: post.createdAt,
    dateModified: post.createdAt,
  }

  return (
    <>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.articleMarkdownContainer}>
        <ArticleHeader readingTime={readingTime} frontmatter={frontmatter} />
        <ArticleContent mdxSource={mdxSource} />
      </section>
      <ArticleFooter post={frontmatter} />
    </>
  )
}

export default Page

export async function generateStaticParams() {
  const data = await generatePaths()
  if (isFailure(data)) return []
  return data.value.posts
}

const generatePaths = async () => {
  try {
    const posts = await getPosts(undefined)
    const postsSlug = posts.map((post) => ({
      slug: post.id,
    }))

    return Success({ posts: postsSlug })
  } catch (error) {
    console.error(error)
    return Failure(new Error('Failed to generate paths'))
  }
}

export async function generateMetadata({
  searchParams,
  params,
}: PagePropTypes): Promise<Metadata> {
  const rkey = searchParams.rkey

  if (!rkey) return {}

  const data = await blogpost.getBlogPost(rkey)

  if (isFailure(data)) {
    return {}
  }

  const post = data.value.post
  const profile = data.value.profile

  const shortedContent = post.content?.slice(0, 300) || ''

  const seo = makeSeo({
    title: post.title,
    description: shortedContent,
    image: '',
    ogText: shortedContent,
    keywords: 'article, blog, rwietter, web development, programming, tech',
    author: profile.displayName,
    slug: `/blog/article/${params.slug}?rkey=${rkey}`,
    abstract: shortedContent,
  })

  return seo
}
