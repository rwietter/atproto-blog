/**
 * By @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

export const uriToRkey = (uri: string): string => {
  const rkey = uri.split('/').pop()
  if (!rkey) {
    throw new Error('Failed to get rkey from uri.')
  }
  return rkey
}
