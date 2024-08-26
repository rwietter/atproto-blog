import type { PropsWithChildren } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import styles from './styles.module.css'

type MessagerPropTypes = PropsWithChildren

const MessagerCallout: React.FC<MessagerPropTypes> = ({ children }) => (
  <section className={styles.messager}>
    <BsInfoCircle size={45} />
    {children}
  </section>
)

export default MessagerCallout
