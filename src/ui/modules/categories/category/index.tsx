import type { CategoryPost } from '@/types/Category'
import Link from 'next/link'
import type { FC } from 'react'
import { TfiPencil } from 'react-icons/tfi'
import { getDate } from 'utils/get-date'
import styles from './styles.module.css'

type PostsPropTypes = {
  categoryPost: CategoryPost
}

const Category: FC<PostsPropTypes> = ({ categoryPost }) => {
  const publishedAt = getDate(categoryPost.publishedAt)

  return (
    <li className={styles.cardContainer}>
      <p className={styles.dateTimeRead}>
        <TfiPencil size={17} />
        {publishedAt}
      </p>
      <Link
        href={`/blog/article/${categoryPost.slug}`}
        scroll={false}
        shallow={true}
        prefetch={true}
        aria-label={categoryPost.title}
        className={styles.postTitle}
        suppressHydrationWarning
      >
        {categoryPost.title}
      </Link>
    </li>
  )
}

export { Category }
