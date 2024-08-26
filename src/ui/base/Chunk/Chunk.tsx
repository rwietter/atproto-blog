'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type ChunkPropTypes = React.PropsWithChildren

const Chunk: React.FC<ChunkPropTypes> = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      setVisible(true)
    }
  }, [inView])

  return (
    <div ref={ref} data-visible={visible}>
      {visible ? children : null}
    </div>
  )
}

export default Chunk
