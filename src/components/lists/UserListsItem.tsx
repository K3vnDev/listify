'use client'

import Link from 'next/link'

interface Props {
  id: string
  name: string
  color: string
}

export const UserListsItem = ({ id, name, color }: Props) => {
  const handleClick = () => {}

  return (
    <Link href={`/mylists/${id}`}>
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
