'use client'

import { Name } from '@/components/lists/Name'
import { OptionsMenu } from '@/components/lists/options-menu/OptionsMenu'
import { CreateTaskButton } from '@/components/tasks/CreateTaskButton'
import { TasksSection } from '@/components/tasks/TasksSection'
import { ListContext } from '@/context/ListContext'
import { useRefreshStateLists } from '@/hooks/useRefreshStateLists'
import { useListsStore } from '@/store/lists/useListsStore'
import type { List } from '@/types'
import { dataFetch } from '@/utils/dataFetch'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ListView() {
  const { listId } = useParams()
  const [isBeingDeleted, setIsBeingDeleted] = useState(false)

  const setSelectedList = useListsStore(s => s.setSelectedList)
  const selectedList = useListsStore(s => s.selectedList)
  const setRecentlySavedList = useListsStore(s => s.setRecentlySavedList)

  useRefreshStateLists()

  const handleError = () => {
    // TODO: Handle errors
  }

  useEffect(() => {
    if (selectedList === null) {
      dataFetch<List>({
        url: `/api/lists?list-id=${listId}`,
        onSuccess: data => {
          setSelectedList(data)
        },
        onError: handleError
      })
    }
    setRecentlySavedList(null)
  }, [])

  return (
    <ListContext.Provider value={{ isBeingDeleted, setIsBeingDeleted }}>
      <main
        className='bg-[#ddd] flex flex-col w-full rounded-2xl py-6 px-4 border-t-8 gap-6 max-h-full overflow-hidden'
        style={{ borderColor: selectedList?.color ?? 'gray' }}
      >
        <header className='flex w-full max-w-full justify-between items-center gap-4'>
          <Name name={selectedList?.name} />
          <div className='flex items-center gap-3'>
            <CreateTaskButton />
            <OptionsMenu />
          </div>
        </header>
        <TasksSection />
      </main>
    </ListContext.Provider>
  )
}
