'use client'

import { useCallback, useRef } from 'react'

type Deadline = {
  didTimeout: boolean
  timeRemaining: () => number
}

type Task = () => void

const useIdleQueue = (timeout = 2000) => {
  const taskQueue = useRef<Task[]>([])
  const idleCallbackId = useRef<number | null>(null)

  // useEffect(() => {
  //   return () => {
  //     if (idleCallbackId.current) {
  //       window.cancelIdleCallback(idleCallbackId.current)
  //     }
  //   }
  // }, [])

  const runTasks = useCallback(
    (deadline: Deadline) => {
      while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        taskQueue.current.length > 0
      ) {
        const task = taskQueue.current.shift() as Task
        task()
      }

      if (taskQueue.current.length > 0) {
        idleCallbackId.current = window.requestIdleCallback(runTasks, {
          timeout,
        })
      }
    },
    [timeout],
  )

  const addTask = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (task: any) => {
      taskQueue.current.push(task)
      if (!idleCallbackId.current) {
        idleCallbackId.current = window.requestIdleCallback(runTasks, {
          timeout,
        })
      }
    },
    [runTasks, timeout],
  )

  return { addTask }
}

export { useIdleQueue }
