import { isErr } from '@/common/fp/Result'
import type { Post } from '@/core/entities/Post'
import type { Profile } from '@/core/entities/Profile'
import { getPost, getPosts, getProfile } from '@/infra/api/atproto'
import type { BlogPostPort } from '@/ports/output/blogPostPort'

export const blogAdapter = (): BlogPostPort => ({
  getPosts: async (): Promise<Post[]> => {
    const posts = await getPosts(undefined)

    if (isErr(posts)) throw new Error('Failed to get posts')

    return posts.value.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      cid: post.cid,
      banner: post.banner,
    }))
  },

  getProfile: async (): Promise<Profile> => {
    const profile = await getProfile()

    if (isErr(profile)) throw new Error('Failed to get profile')

    return profile.value
  },

  getPost: async (slug: string): Promise<Post> => {
    const post = await getPost(slug)

    if (isErr(post)) throw new Error('Failed to get post')

    return post.value
  },
})
