'use client'

import { ItemList } from '@/components/lists/ItemList'
import { useReset } from '@/hooks/useReset'
import { useListsStore } from '@/store/lists/useListsStore'
import type { List } from '@/types'
import { dataFetch } from '@/utils/dataFetch'
import { useEffect, useState } from 'react'

export const ItemListsSection = () => {
  const lists = useListsStore(s => s.lists)
  const setLists = useListsStore(s => s.setLists)
  const listsDisplayMode = useListsStore(s => s.listsDisplayMode)
  useReset()

  const handleError = () => {
    // TODO: Handle errors
  }

  useEffect(() => {
    if (lists === null)
      dataFetch<List[]>({
        url: '/api/lists/all',
        onSuccess: data => setLists(data),
        onError: handleError
      })
  }, [])

  if (!lists) return null

  const className = {
    list: 'flex flex-col gap-3',
    grid: 'grid [grid-template-columns:repeat(auto-fit,_minmax(300px,_1fr))] grid-rows-5 gap-3 *:size-full *:h-20'
  }

  return lists.length > 0 ? (
    <ul className={className[listsDisplayMode]}>
      {lists.map(list => (
        <ItemList key={list.id} {...list} />
      ))}
    </ul>
  ) : (
    <span className='text-white/50 mt-1'>You dont have any lists yet.</span>
  )
}
