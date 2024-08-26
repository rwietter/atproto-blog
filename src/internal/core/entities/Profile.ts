export interface Profile {
  did: string
  handle: string
  displayName: string | undefined
  description: string | undefined
  avatar: string | undefined
  banner: string | undefined
  followersCount: number | undefined
  followsCount: number | undefined
  postsCount: number | undefined
  createdAt: string | undefined
}
