/**
 * By @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import {
  getCachedProfile,
  setCachedProfile,
} from '@/adapters/database/redis/redis'
import { bskyAgent } from './agent'

export const getProfile = async () => {
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

  await setCachedProfile(res.data)
  return res.data
}
