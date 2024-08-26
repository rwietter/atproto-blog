import type { BlogPostPort } from '@/ports/output/blogPostPort'

export const getPost = async (blogPostPort: BlogPostPort, slug: string) => {
  const posts = blogPostPort.getPost(slug)
  return posts
}
