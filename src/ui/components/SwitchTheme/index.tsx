'use client'

import { MdSunny } from 'react-icons/md'
import styles from './styles.module.css'

interface Props {
  visible: 'header' | 'sticky'
}

const SwitchTheme: React.FC<Props> = ({ visible }) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={styles.theme} onClick={switchTheme} data-visible={visible}>
      <MdSunny />
    </div>
  )
}

export default SwitchTheme

function saveTheme() {
  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark')
    notifyTheme('dark')
    return
  }
  notifyTheme('light')
  localStorage.setItem('theme', 'light')
}

function switchTheme() {
  document.documentElement.classList.toggle('dark')
  saveTheme()
}

function notifyTheme(theme: string) {
  if (!('Notification' in window)) {
    return
  }

  if (Notification.permission === 'granted') {
    new Notification(`Theme set to ${theme}`)
    return
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(`Theme set to ${theme}`)
      }
    })
  }
}
