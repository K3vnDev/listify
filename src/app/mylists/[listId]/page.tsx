'use client'

import { Name } from '@/components/lists/Name'
import { CreateTaskButton } from '@/components/tasks/CreateTaskButton'
import { TasksSection } from '@/components/tasks/TasksSection'
import { ArrowDownIcon } from '@/icons'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ListView() {
  const lists = useStore(s => s.lists)
  const { listId } = useParams()

  const setSelectedList = useStore(s => s.setSelectedList)
  const selectedList = useStore(s => s.selectedList)

  const handleError = () => {
    // TODO: Handle errors
  }

  const saveListToStore = async () => {
    let toSaveList = lists?.find(list => list.id === listId)

    if (toSaveList === undefined) {
      try {
        const res = await fetch(`/api/lists?list-id=${listId}`)
        const { success, data } = await res.json()

        if (!res.ok || !success) {
          return handleError()
        }
        toSaveList = data
      } catch {
        handleError()
      }
    }
    toSaveList ? setSelectedList(toSaveList) : handleError()
  }
  useEffect(() => {
    saveListToStore()
  }, [])

  return (
    <main
      className='bg-[#ddd] flex flex-col w-full rounded-2xl py-6 px-4 border-t-8 gap-6'
      style={{ borderColor: selectedList?.color ?? 'gray' }}
    >
      <header className='flex w-full max-w-full justify-between items-center gap-4'>
        <Name name={selectedList?.name} />
        <div className='flex items-center gap-2'>
          <CreateTaskButton />
          <ArrowDownIcon className='size-8 text-slate-600' />
        </div>
      </header>
      <TasksSection />
    </main>
  )
}
