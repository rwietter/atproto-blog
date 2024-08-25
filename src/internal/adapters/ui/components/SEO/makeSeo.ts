import type { Metadata } from 'next'

export const makeSeo = ({
  title,
  description,
  image,
  slug,
  ogText,
  abstract = 'Notices about my projects.',
  keywords = 'projects, portfolio, software, developer',
  author = 'Mauricio Witter',
}: {
  title: string
  description: string
  image: string
  slug: string
  ogText: string
  abstract?: string
  keywords?: string
  author?: string
}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      url: `https://rwietter.dev${slug}`,
      type: 'website',
      siteName: 'Mauricio Witter | Software Developer',
      ttl: 60,
      determiner: 'auto',
      countryName: 'Brazil',
      alternateLocale: 'pt-BR',
      locale: 'en_US',
      title,
      description,
      images: [
        {
          url: '',
          width: 800,
          height: 600,
          alt: description,
        },
      ],
    },
    abstract,
    keywords,
    robots: 'index, follow',
    authors: [
      {
        name: author,
        url: 'https://rwietter.dev',
      },
    ],
    applicationName: 'Mauricio Witter | Software Developer',
    manifest: '/manifest.json',
    classification: 'Software Engineer',
    alternates: {
      canonical: `https://rwietter.dev${slug}`,
    },
    category: 'Software Engineer',
    creator: author,
    bookmarks: `https://rwietter.dev${slug}`,
    publisher: author,
    twitter: {
      site: '@rwietter',
      creator: '@rwietter',
      card: 'summary_large_image',
      title,
      description,
      siteId: `https://rwietter.dev${slug}`,
      creatorId: 'https://rwietter.dev',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogText,
        },
      ],
    },
  }
}