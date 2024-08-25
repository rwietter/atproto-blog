import useReadingTime from 'reading-time'

export const getReadingTime = (content?: string) => {
  if (!content) return { readingTime: 0 }
  const { text } = useReadingTime(content)
  return { readTime: text }
}
