import type { Post } from '@/core/entities/Post'
import type { FC } from 'react'
import { Posts } from '../posts'
import styles from './styles.module.css'

type BlogPropTypes = {
  posts: Post[]
}

const BlogPosts: FC<BlogPropTypes> = ({ posts }) => (
  <ul className={styles.articlesContainer}>
    {posts?.map((post) => (
      <Posts post={post} key={post.cid} />
    ))}
  </ul>
)

export { BlogPosts }
