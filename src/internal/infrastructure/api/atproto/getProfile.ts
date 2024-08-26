/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import type { Profile } from '@/core/entities/Profile'
import {
  getCachedProfile,
  setCachedProfile,
} from '@/infra/database/redis/redis'
import { bskyAgent } from './agent'

export const getProfile = async (): Promise<Profile> => {
  const did = process.env.ATP_DID as string

  const cachedProfile = await getCachedProfile()
  if (cachedProfile) {
    return cachedProfile
  }

  const res = await bskyAgent.getProfile({
    actor: did,
  })

  if (!res.success) {
    throw new Error('Failed to get profile.')
  }

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

  await setCachedProfile(profile)
  return profile
}
