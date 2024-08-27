'use client'

import type { Action as KBarAction } from 'kbar'
import { useRouter } from 'next/navigation'
import { CiLink } from 'react-icons/ci'
import { RiBlueskyLine, RiHome3Line } from 'react-icons/ri'
import { SlHeart, SlSocialGithub } from 'react-icons/sl'
import { TbBrandTelegram } from 'react-icons/tb'

const copyLink = () => navigator?.clipboard?.writeText(window.location.href)

const Actions = () => {
  const router = useRouter()

  const actions: KBarAction[] = [
    {
      id: 'Copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: <CiLink size={22} color='var(--colors-gray50)' />,
    },
    {
      id: 'Home',
      name: 'Home',
      shortcut: ['h'],
      keywords: 'page-home',
      section: 'Pages',
      perform: () => router.push('/'),
      icon: <RiHome3Line size={18} color='var(--colors-gray50)' />,
    },
    {
      id: 'Blog',
      name: 'Blog',
      shortcut: ['b'],
      keywords: 'go-blog',
      section: 'Pages',
      perform: () => router.push('/blog'),
      icon: <SlHeart size={18} color='var(--colors-gray50)' />,
    },
    {
      id: 'GitHub',
      name: 'GitHub',
      shortcut: ['g'],
      keywords: 'github',
      section: 'Social',
      perform: () => window.open('https://github.com/rwietter', '_blank'),
      icon: <SlSocialGithub size={18} color='var(--colors-gray50)' />,
    },
    {
      id: 'Bluesky',
      name: 'Bluesky',
      shortcut: ['u'],
      keywords: 'Bluesky',
      section: 'Social',
      perform: () =>
        window.open(
          'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
          '_blank',
        ),
      icon: <RiBlueskyLine size={18} color='var(--colors-gray50)' />,
    },
    {
      id: 'Telegram',
      name: 'Telegram',
      shortcut: ['c'],
      keywords: 'telegram',
      section: 'Social',
      perform: () => window.open('https://t.me/rwietter', '_blank'),
      icon: <TbBrandTelegram size={18} color='var(--colors-gray50)' />,
    },
  ]
  return { actions }
}

export default Actions
