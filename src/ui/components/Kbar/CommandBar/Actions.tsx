'use client'

import type { Action as KBarAction } from 'kbar'
import { useRouter } from 'next/navigation'
import { BiCodeCurly } from 'react-icons/bi'
import { CiLink } from 'react-icons/ci'
import { FaFontAwesomeFlag } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { RiHome3Line } from 'react-icons/ri'
import { SiSubstack } from 'react-icons/si'
import { SlHeart, SlSocialGithub, SlSocialTwitter } from 'react-icons/sl'
import { TbBrandTelegram } from 'react-icons/tb'
import { PiCherriesThin } from 'react-icons/pi'

const Actions = () => {
  const router = useRouter()

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

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
      id: 'Contact',
      name: 'Contact',
      shortcut: ['e'],
      keywords: 'contact',
      section: 'General',
      perform: () => router.push('/contact'),
      icon: <MdOutlineAlternateEmail size={18} color='var(--colors-gray50)' />,
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
      id: 'Awesome',
      name: 'Awesome',
      shortcut: ['a'],
      keywords: 'page-awesome',
      section: 'Pages',
      perform: () => router.push('/awesome'),
      icon: <FaFontAwesomeFlag size={16} color='var(--colors-gray50)' />,
    },
    {
      id: 'Microblog',
      name: 'Microblog',
      shortcut: ['m'],
      keywords: 'microblog',
      section: 'Pages',
      perform: () => router.push('/microblog'),
      icon: <PiCherriesThin size={18} color='var(--colors-gray50)' />,
    },
    {
      id: 'Projects',
      name: 'Projects',
      shortcut: ['p'],
      keywords: 'page-projects',
      section: 'Pages',
      perform: () => router.push('/projects'),
      icon: <BiCodeCurly size={18} color='var(--colors-gray50)' />,
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
      id: 'Substack',
      name: 'Substack',
      shortcut: ['s'],
      keywords: 'substack',
      section: 'Social',
      perform: () => window.open('https://rwietter.substack.com/', '_blank'),
      icon: <SiSubstack size={18} color='var(--colors-gray50)' />,
    },
    {
      id: 'Twitter',
      name: 'Twitter',
      shortcut: ['t'],
      keywords: 'twitter',
      section: 'Social',
      perform: () => window.open('https://twitter.com/rwietter', '_blank'),
      icon: <SlSocialTwitter size={18} color='var(--colors-gray50)' />,
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
