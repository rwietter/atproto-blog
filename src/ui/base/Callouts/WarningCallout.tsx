import type { PropsWithChildren } from 'react'
import { TiWarningOutline } from 'react-icons/ti'
import styles from './styles.module.css'

type WarningPropTypes = PropsWithChildren

const WarningCallout: React.FC<WarningPropTypes> = ({ children }) => (
  <section className={styles.warning}>
    <TiWarningOutline size={45} />
    {children}
  </section>
)

export default WarningCallout
