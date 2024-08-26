import type { Weather } from '@/infra/api/weather/types'
import type { FC } from 'react'
import { RiSunCloudyLine } from 'react-icons/ri'
import styles from './styles.module.css'

interface WeatherPropsTypes {
  weather: Weather[]
}

export const WeatherConditions: FC<WeatherPropsTypes> = ({ weather }) => {
  if (weather === null) return <span />

  const data = weather[0]

  return (
    <>
      {data?.Temperature && (
        <p className={styles.weather}>
          <span className={styles.temperature}>
            <RiSunCloudyLine size={18} />
            <strong>
              &nbsp;
              {data?.Temperature?.Metric?.Value}
              °C &nbsp;
            </strong>
          </span>
          <span>
            <span>{data?.WeatherText && `( ${data.WeatherText} )`}</span>
            <span> &nbsp; in Constantina.</span>
          </span>
        </p>
      )}
    </>
  )
}
