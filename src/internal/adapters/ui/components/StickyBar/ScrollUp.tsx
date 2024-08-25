'use client'

import { AiOutlineArrowUp } from 'react-icons/ai'

import styles from './styles.module.css'

const ScrollUp: React.FC = () => {
  const handleToTop = () => {
    const position =
      document.body.scrollTop || document.documentElement.scrollTop
    let scrollAnimation = undefined
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)))
      scrollAnimation = setTimeout(handleToTop, 30)
    } else clearTimeout(scrollAnimation)
  }
  return (
    <button
      type='button'
      className={styles.menuBarItem}
      aria-label='Navigate to top'
      title='Navigate to top'
      role='menuitem'
    >
      <AiOutlineArrowUp onClick={handleToTop} size={20} />
    </button>
  )
}

export default ScrollUp
