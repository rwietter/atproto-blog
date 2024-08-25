'use client'

import { useKBar } from 'kbar'
import styles from './styles.module.css'

const KbarInit = () => {
  const kbar = useKBar()

  const handleOpenKbar = () => kbar.query.toggle()

  return (
    <div className={styles.kbarContainer}>
      <button
        className={styles.kbarButton}
        type='button'
        onClick={handleOpenKbar}
      >
        Press &nbsp;
        <code>ctrl</code>
        &nbsp;+&nbsp;
        <code>space</code>
        &nbsp; to start →
      </button>
    </div>
  )
}

export { KbarInit }
