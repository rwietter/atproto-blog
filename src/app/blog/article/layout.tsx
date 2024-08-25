import type { FC, PropsWithChildren } from 'react'
import Providers from './providers'

import '../../../../styles/article-markdown.css'
import '../../../../styles/footnotes.css'
import '../../../../styles/katex-override.css'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <Providers>{children}</Providers>
}

export default ArticleLayout
