import { useEffect, useRef } from 'react'

const useDeferredTasks = (tasks = []) => {
  const taskQueue = useRef<(() => void)[]>([])

  useEffect(() => {
    taskQueue.current.push(...tasks)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        while (taskQueue.current.length > 0) {
          const task = taskQueue.current.shift() as () => void
          task()
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [tasks])

  const addTask = (task: () => void) => {
    taskQueue.current.push(task)
  }

  return [addTask]
}

export default useDeferredTasks
