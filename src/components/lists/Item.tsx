'use client'

import type { List } from '@/types.d'
import Link from 'next/link'

export const Item = ({ id, name, color }: List) => {
  const handleClick = () => {}

  return (
    <Link href={`/mylists/${id}`} onClick={() => {}}>
      <li
        onClick={handleClick}
        className='bg-[#1A1C21] border border-[#222] p-4 pr-8 rounded-lg flex gap-4 w-fit cursor-pointer'
      >
        <div className='size-6 rounded' style={{ background: color }} />
        <span className='text-white'>{name}</span>
      </li>
    </Link>
  )
}
