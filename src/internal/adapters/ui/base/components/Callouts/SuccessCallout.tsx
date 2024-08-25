import type { PropsWithChildren } from 'react'
import { IoCheckmarkDone } from 'react-icons/io5'
import styles from './styles.module.css'

type SuccessPropTypes = PropsWithChildren

const SuccessCallout: React.FC<SuccessPropTypes> = ({ children }) => (
  <section className={styles.success}>
    <IoCheckmarkDone size={45} />
    {children}
  </section>
)

export default SuccessCallout
