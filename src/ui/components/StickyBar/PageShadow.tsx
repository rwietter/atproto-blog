'use client'

import { BsShadows } from 'react-icons/bs'
import styles from './styles.module.css'

const PageShadow: React.FC = () => {
  const handleUserChangeShadows = () => {
    const pageShadow = document.getElementById('over-shadow')
    pageShadow?.classList.toggle('page-shadow')
  }

  return (
    <button
      className={styles.menuBarItem}
      type='button'
      aria-label='Enable/Disable Shadows'
      title='Enable/Disable Shadows'
      role='menuitem'
      onClick={handleUserChangeShadows}
    >
      <BsShadows size={18} />
    </button>
  )
}

export default PageShadow
