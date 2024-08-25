import { fetcherLastFm } from '@/adapters/lastfm/fetcherLastFm'
import type { RecentTrackProps } from '@/adapters/lastfm/types'
import { fetcherWeather } from '@/adapters/weather/fetcherWeather'

import type { Weather } from '@/adapters/weather/types'
import { Failure, Success, isFailure } from '@/core/common/fp/Result'
import CurrentDate from '../../components/CurrentDate'
import { LastFMTrack } from '../../components/Lastfm'
import { SidebarSocialIcons } from '../../components/Social'
import { WeatherConditions } from '../../components/Weather'
import styles from './styles.module.css'

export interface AuthorContentProps {
  lastFm: RecentTrackProps
  weather: Weather
}

async function getData() {
  try {
    const [weather, lastfm] = await Promise.all([
      fetcherWeather(),
      fetcherLastFm(),
    ])

    return Success({ weather, lastfm })
  } catch (error) {
    return Failure(new Error('Failed to fetch weather and lastfm'))
  }
}

const AuthorContent = async () => {
  const data = await getData()

  if (isFailure(data)) return <div /> // ignore this infos

  return (
    <section className={styles.content_container}>
      <div className={styles.currentlyInformation}>
        <CurrentDate />
        <WeatherConditions weather={data.value.weather} />
      </div>
      <LastFMTrack lastFm={data.value.lastfm} />
    </section>
  )
}

type Author = {
  name: string
  username: string
  biography: string
  avatar: string
}

export const author: Author = {
  name: 'Maurício Witter',
  username: 'rwietter',
  biography:
    "I'm a brazilian Software Developer, student and a writer. I'm currently working as a Fullstack Developer. I love to write about my experiences and contribute to the community.",
  avatar: 'https://i.pravatar.cc/150?img=1',
}

const AuthorHeader = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.name}>{author.name}</h1>
      <span className={styles.username}>@{author.username}</span>
      <h2 className={styles.biography}>{author.biography}</h2>
      <div className={styles.socialContainer}>
        <SidebarSocialIcons />
      </div>
    </section>
  )
}

export const Author = () => (
  <>
    <AuthorHeader />
    <AuthorContent />
  </>
)
