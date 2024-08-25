'use client'

import { IoIosTimer } from 'react-icons/io'
import { getDate } from 'utils/get-date'
import styles from './styles.module.css'

const CurrentDate = () => {
  const currentDate = getDate()

  return (
    <div className={styles.date}>
      <IoIosTimer size={18} />
      <time className={styles.dateTime}>
        <span className={styles.current}>
          {currentDate ? currentDate : <div />}
        </span>
      </time>
    </div>
  )
}

export default CurrentDate
