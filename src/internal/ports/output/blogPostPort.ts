import type { Post } from '@/core/entities/Post'
import type { Profile } from '@/core/entities/Profile'

export type BlogPostPort = {
  getPosts: () => Promise<Post[]>
  getProfile: () => Promise<Profile>
  getPost: (slug: string) => Promise<Post>
}
