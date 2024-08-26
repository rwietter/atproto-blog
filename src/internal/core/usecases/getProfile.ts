import type { BlogPostPort } from '@/ports/output/blogPostPort'

export const getProfile = async (blogPostPort: BlogPostPort) => {
  return blogPostPort.getProfile()
}
