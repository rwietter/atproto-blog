import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type MDXSerialized = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
>
