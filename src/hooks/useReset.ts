import { useListsStore } from '@/store/lists/useListsStore'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import { useEffect } from 'react'

export const useReset = () => {
  const setTasks = useTasksStore(s => s.setTasks)
  const setEditingTask = useTasksStore(s => s.setEditingTask)
  const setSelectedList = useListsStore(s => s.setSelectedList)
  const setRecentlySavedList = useListsStore(s => s.setRecentlySavedList)

  useEffect(() => {
    setTasks(null)
    setEditingTask(null)
    setSelectedList(null)
    setRecentlySavedList(null)
  }, [])
}
