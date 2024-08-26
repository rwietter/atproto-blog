import type { Post } from '@/core/entities/Post'
import { getDate } from '@/utils/get-date'
import Link from 'next/link'
import type { FC } from 'react'
import { TfiPencil } from 'react-icons/tfi'
import styles from './styles.module.css'

type PostsPropTypes = {
  post: Post
}

const Posts: FC<PostsPropTypes> = ({ post }) => {
  const publishedAt = getDate(post.createdAt)

  return (
    <li className={styles.cardContainer}>
      <p className={styles.dateTimeRead}>
        <TfiPencil size={17} />
        {publishedAt}
      </p>
      <Link
        href={`/blog/article/${post.title.split(' ').join('-').toLowerCase()}?rkey=${post.id}`}
        prefetch={true}
        aria-label={post.title}
        className={styles.postTitle}
      >
        {post.title}
      </Link>
    </li>
  )
}

export { Posts }
