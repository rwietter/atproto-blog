import type { PropsWithChildren } from 'react'
import { GoAlert } from 'react-icons/go'
import styles from './styles.module.css'

type ErrorPropTypes = PropsWithChildren

const ErrorCallout: React.FC<ErrorPropTypes> = ({ children }) => (
  <section className={styles.error}>
    <GoAlert size={45} />
    {children}
  </section>
)

export default ErrorCallout
