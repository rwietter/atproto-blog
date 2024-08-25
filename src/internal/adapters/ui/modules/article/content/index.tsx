'use client'

import MDX from '@/adapters/ui/base/components/MDX'
import type { FC } from 'react'
import type { MDXSerialized } from 'utils/mdx/types'
import styles from './styles.module.css'

type ArticlePropTypes = {
  mdxSource: MDXSerialized
}

const ArticleContent: FC<ArticlePropTypes> = ({ mdxSource }) => {
  return (
    <div className={styles.articleContainer}>
      <article className={`${styles.articleMarkdown} blogpost`}>
        <MDX mdxSource={mdxSource} />
      </article>
    </div>
  )
}

export default ArticleContent
