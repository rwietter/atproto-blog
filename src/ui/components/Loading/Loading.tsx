import NextTopLoader from 'nextjs-toploader'

const Loading: React.FC = () => {
  return (
    <NextTopLoader
      height={4}
      color='var(--main-color)'
      crawl={true}
      showSpinner={true}
    />
  )
}

export default Loading
