/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

export interface WhtwndBlogEntryRecord {
  $type: 'com.whtwnd.blog.entry'
  content?: string
  createdAt: string
  theme?: string
  title: string
  ogp?: {
    height: number | null
    url: string | null
    width: number | null
  }
}
