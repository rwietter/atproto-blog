import { formatDate } from 'utils/get-date'
import styles from './styles.module.css'

type MicroPostPropTypes = React.PropsWithChildren<{
  title: string
  date: string
}>

const MicroPost: React.FC<MicroPostPropTypes> = (props) => (
  <section className={styles.micropost}>
    <span className={styles.date}>{formatDate(props.date)}</span>
    <h2>{props.title}</h2>
    {props.children}
  </section>
)

export default MicroPost
