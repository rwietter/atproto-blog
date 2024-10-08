import { Err, Ok, type Result, isErr } from '@/common/fp/Result'
import type { Post } from '@/core/entities/Post'
import { atpAgent } from './agent'
import type { WhtwndBlogEntryRecord } from './atproto'
import { whtwndBlogEntryRecordToView } from './dataToView'

export const getPost = async (rkey: string): Promise<Result<Post>> => {
  const repo = process.env.ATP_IDENTIFIER as string

  const res = await atpAgent.com.atproto.repo.getRecord({
    collection: 'com.whtwnd.blog.entry',
    repo,
    rkey,
  })

  if (!res.success) return Err(new Error('Failed to get post'))

  const post = whtwndBlogEntryRecordToView({
    uri: res.data.uri,
    cid: res.data.cid?.toString() ?? '',
    value: res.data.value as WhtwndBlogEntryRecord,
  })

  if (isErr(post)) return Err(new Error('Failed to convert post'))

  return Ok(post.value)
}
