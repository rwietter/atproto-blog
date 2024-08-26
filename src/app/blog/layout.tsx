import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const BlogLayout: FC<Props> = async ({ children }) => {
  return <div>{children}</div>
}

export default BlogLayout
