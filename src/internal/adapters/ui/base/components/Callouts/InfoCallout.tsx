import type { PropsWithChildren } from 'react'
import { GrInfo } from 'react-icons/gr'
import styles from './styles.module.css'

type InfoPropTypes = PropsWithChildren

const InfoCallout: React.FC<InfoPropTypes> = ({ children }) => (
  <section className={styles.info}>
    <GrInfo size={45} />
    {children}
  </section>
)

export default InfoCallout
