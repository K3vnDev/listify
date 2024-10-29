'use client'

import { ItemList } from '@/components/lists/ItemList'
import { useReset } from '@/hooks/useReset'
import { useListsStore } from '@/store/lists/useListsStore'
import { dataFetch } from '@/utils/dataFetch'
import { useEffect } from 'react'

export const ItemListsSection = () => {
  const lists = useListsStore(s => s.lists)
  const setLists = useListsStore(s => s.setLists)
  useReset()

  const handleError = () => {
    // TODO: Handle errors
  }

  useEffect(() => {
    if (lists === null)
      dataFetch({
        url: '/api/lists/all',
        onSuccess: data => setLists(data),
        onError: handleError
      })
  }, [])

  if (!lists) return null

  return (
    <ul className='flex flex-col gap-3'>
      {lists.map(list => (
        <ItemList key={list.id} {...list} />
      ))}
    </ul>
  )
}
