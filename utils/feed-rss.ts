import type { Post } from '@/core/entities/Post'
import type { Profile } from '@/core/entities/Profile'
import { Feed, type FeedOptions } from 'feed'
import fs from 'node:fs'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

interface RssFeedProps {
  profile: Profile
  posts: Post[]
}

const generateRssFeed = async ({
  posts,
  profile,
}: RssFeedProps): Promise<void> => {
  const url = process.env.SITE_URL || 'https://rwietter.dev'

  const feedOptions: FeedOptions = {
    title: `${profile.displayName} | Blog RSS Feed`,
    description: `Follow the latest posts from ${profile.displayName}\'s blog on this RSS feed.`,
    copyright: `Copyright © ${new Date().getFullYear()} ${profile.displayName}. All rights reserved.`,
    id: url,
    author: {
      email: 'rwietter@duck.com',
      name: profile.displayName,
      link: 'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
    },
    favicon: `${url}/favicon.ico`,
    feedLinks: {
      rss2: `${url}/rss.xml`,
      json: `${url}/rss.json`,
      atom: `${url}/rss.atom`,
    },
    generator: 'Feed for Node.js',
    link: url,
    image: `${url}/icons/mstile-310x310.png`,
    updated: new Date(),
    language: 'en',
    feed: `${url}/rss.xml`,
    docs: 'https://validator.w3.org/feed/docs/rss2.html',
    hub: 'https://pubsubhubbub.appspot.com/',
  }

  const feed = new Feed(feedOptions)

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      description: post.content,
      link: `${url}/blog/article/${post.id}?key=${post.id}`,
      guid: post.id,
      published: new Date(post.createdAt),
      id: `${url}/blog/article/${post.id}?key=${post.id}`,
      content: remark().use(remarkHtml).processSync(post.content).toString(),
      copyright: feedOptions.copyright,
      date: new Date(post.createdAt),
      author: [
        {
          email: 'mauriciobw17@gmail.com',
          name: 'Maurício Witter',
          link: 'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
        },
      ],
    })
  }

  fs.writeFileSync('./public/rss.xml', feed.rss2())
  fs.writeFileSync('./public/rss.json', feed.json1())
  fs.writeFileSync('./public/rss.atom', feed.atom1())
}

export default generateRssFeed
