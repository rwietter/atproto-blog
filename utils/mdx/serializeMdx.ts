import { serialize } from 'next-mdx-remote/serialize'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import type { MDXSerialized } from 'utils/mdx/types'

export async function getMdxSource(
  content?: string,
): Promise<MDXSerialized | null> {
  if (!content) return null

  const source = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            highlight: true,
            lineNumbers: true,
            theme: {
              dark: 'github-dark-default',
              light: 'github-light-default',
            },
          },
        ],
        [rehypeExternalLinks, { target: '_blank' }],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
      useDynamicImport: true,
    },
    parseFrontmatter: true,
  })
  return source
}
