'use client'

import { AddButton } from '@/components/AddButton'
import { CreateTaskButton } from '@/components/tasks/CreateTaskButton'
import { TasksSection } from '@/components/tasks/TasksSection'
import { ArrowDownIcon } from '@/icons'
import { useStore } from '@/store/useStore'
import type { List } from '@/types.d'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ListView() {
  const lists = useStore(s => s.lists)
  const { listId } = useParams()

  const [list, setList] = useState<List | null>(null)

  const handleError = () => {}

  const fetchList = async () => {
    try {
      const res = await fetch(`/api/lists?list-id=${listId}`)
      if (!res.ok) return handleError()

      const { data } = await res.json()
      setList(data)
    } catch {
      handleError()
    }
  }

  useEffect(() => {
    if (lists === null) {
      fetchList()
      return
    }

    const list = lists.find(list => list.id === listId)
    if (list === undefined) return handleError()
    setList(list)
  }, [])

  if (list === null) return null
  const { name, color } = list

  return (
    <main
      className='bg-[#ddd] flex flex-col w-full rounded-2xl py-6 px-4 border-t-8 gap-6'
      style={{ borderColor: color }}
    >
      <header className='flex w-full justify-between gap-2'>
        <h3 className='font-bold text-2xl text-nowrap text-ellipsis overflow-hidden'>{name}</h3>
        <div className='flex items-center gap-2'>
          <CreateTaskButton />
          <ArrowDownIcon className='size-8 text-slate-600' />
        </div>
      </header>
      <TasksSection />
    </main>
  )
}
