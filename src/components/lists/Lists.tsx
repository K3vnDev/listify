'use client'

import { useReset } from '@/hooks/useReset'
import { useStore } from '@/store/useStore'
import type { List } from '@/types.d'
import { useEffect } from 'react'
import { Item } from './Item'

interface Props {
  lists: List[]
}

export const Lists = ({ lists }: Props) => {
  const setLists = useStore(s => s.setLists)
  const { reset } = useReset()

  useEffect(() => {
    setLists(lists)
    reset()
  }, [])

  return (
    <ul className='flex flex-col gap-3'>
      {lists.map(list => (
        <Item key={list.id} {...list} />
      ))}
    </ul>
  )
}
