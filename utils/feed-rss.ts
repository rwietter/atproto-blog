import { Feed } from 'feed'
import fs from 'node:fs'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type {
  BskyProfileView,
  WhtwndBlogEntryView,
} from 'src/internal/Infrastructure/api/atproto'

interface RssFeedProps {
  profile: BskyProfileView
  posts: WhtwndBlogEntryView[]
}

const generateRssFeed = async ({
  posts,
  profile,
}: RssFeedProps): Promise<void> => {
  const url = process.env.SITE_URL || 'https://rwietter.dev'

  const feedOptions = {
    title: `${profile.displayName} | Blog RSS Feed`,
    description: `Follow the latest posts from ${profile.displayName}\'s blog on this RSS feed.`,
    site_url: url,
    feed_url: `${url}/rss.xml`,
    image_url: `${url}/icons/mstile-310x310.png`,
    pubDate: new Date(),
    copyright: `Copyright © ${new Date().getFullYear()} ${profile.displayName}. All rights reserved.`,
    id: url,
    author: {
      email: 'mauriciobw17@gmail.com',
      name: profile.displayName,
      link: 'https://twitter.com/rwietter',
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
  }

  const feed = new Feed(feedOptions)

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      description: post.content,
      link: `${url}/blog/article/${post.rkey}`,
      guid: post.rkey,
      published: new Date(post.createdAt),
      id: `${url}/blog/article/${post.rkey}`,
      content: remark().use(remarkHtml).processSync(post.content).toString(),
      copyright: feedOptions.copyright,
      date: new Date(post.createdAt),
      author: [
        {
          email: 'mauriciobw17@gmail.com',
          name: 'Maurício Witter',
          link: 'https://twitter.com/rwietter',
        },
      ],
    })
  }

  fs.writeFileSync('./public/rss.xml', feed.rss2())
  fs.writeFileSync('./public/rss.json', feed.json1())
  fs.writeFileSync('./public/rss.atom', feed.atom1())
}

export default generateRssFeed
