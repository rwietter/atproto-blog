/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import { getCachedPost, setCachedPost } from '@/infra/database/redis/redis'
import { atpAgent } from './agent'
import type { WhtwndBlogEntryRecord } from './atproto'
import { whtwndBlogEntryRecordToView } from './dataToView'

export const getPost = async (rkey: string, skipCache?: boolean) => {
  const cachedRes = await getCachedPost(rkey)
  if (!skipCache && cachedRes) {
    return cachedRes
  }

  const repo = process.env.ATP_IDENTIFIER as string

  const res = await atpAgent.com.atproto.repo.getRecord({
    collection: 'com.whtwnd.blog.entry',
    repo,
    rkey,
  })

  if (!res.success) {
    throw new Error('Failed to get post.')
  }

  const post = whtwndBlogEntryRecordToView({
    uri: res.data.uri,
    cid: res.data.cid?.toString() ?? '',
    value: res.data.value as WhtwndBlogEntryRecord,
  })

  await setCachedPost(post)
  return post
}