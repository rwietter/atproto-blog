import type { SocialLink } from '@/adapters/ui/components/Social/types'
import { LiaOrcid } from 'react-icons/lia'
import { PiGithubLogo, PiLinkedinLogo, PiTwitterLogo } from 'react-icons/pi'
import { SiSubstack } from 'react-icons/si'

export type SocialLinks = SocialLink[]

export const links: SocialLinks = [
  {
    icon: <PiLinkedinLogo size={27} />,
    url: 'https://www.linkedin.com/in/euiciowr/',
    name: 'LinkedIn',
    color: 'linkedIn',
  },
  {
    icon: <SiSubstack size={22} />,
    url: 'https://rwietter.substack.com/',
    name: 'Substack',
    color: 'substack',
  },
  {
    icon: <PiGithubLogo size={27} />,
    url: 'https://github.com/rwietter',
    name: 'GitHub',
    color: 'github',
  },
  {
    icon: <PiTwitterLogo size={27} />,
    url: 'https://twitter.com/rwietter',
    name: 'Twitter',
    color: 'twitter',
  },
  {
    icon: <LiaOrcid size={27} />,
    url: 'https://orcid.org/0009-0003-5333-2885',
    name: 'ORCID',
    color: 'ORCID',
  },
]
