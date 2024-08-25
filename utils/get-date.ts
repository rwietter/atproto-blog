export function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  const dateObj = new Date(Date.UTC(year, month - 1, day + 1))

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}

export function getDate(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(
    date ? new Date(date) : new Date(),
  )
}
