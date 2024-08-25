'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'

import Err from '@/adapters/ui/base/components/Callouts/ErrorCallout'
import Info from '@/adapters/ui/base/components/Callouts/InfoCallout'
import Message from '@/adapters/ui/base/components/Callouts/MessagerCallout'
import Success from '@/adapters/ui/base/components/Callouts/SuccessCallout'
import Warn from '@/adapters/ui/base/components/Callouts/WarningCallout'
import Chunk from '@/adapters/ui/base/components/Chunk/Chunk'
import Micro from '@/adapters/ui/base/components/MicroPost/MicroPost'
import High from '@/adapters/ui/base/components/TextHighlight/TextHighlight'

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  High,
  Success,
  Warn,
  Err,
  Info,
  Message,
  Chunk,
  Micro,
}

const MDX: React.FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { MDX }
