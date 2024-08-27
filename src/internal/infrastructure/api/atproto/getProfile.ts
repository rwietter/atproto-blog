import { Err, Ok, type Result } from '@/common/fp/Result'
import type { Profile } from '@/core/entities/Profile'
import { atpAgent } from './agent'

export const getProfile = async (): Promise<Result<Profile>> => {
  const did = process.env.ATP_DID as string

  const res = await atpAgent.getProfile({
    actor: did,
  })

  if (!res.success) return Err(new Error('Failed to get profile'))

  const data = res.data

  const profile = {
    displayName: data.displayName,
    avatar: data.avatar,
    banner: data.banner,
    createdAt: data.createdAt,
    description: data.description,
    did: data.did,
    followersCount: data.followersCount,
    followsCount: data.followsCount,
    handle: data.handle,
    indexedAt: data.indexedAt,
    postsCount: data.postsCount,
  }

  return Ok(profile)
}
