'use client'

import { LogOutIcon } from '@/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface Props {
  avatarUrl: string
}

export const UserAvatar = ({ avatarUrl }: Props) => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const itemSize = 'size-8'

  return (
    <div className='flex gap-3 group items-center w-8 hover:w-[4.75rem] [transition:width_.3s_ease] relative'>
      <button
        onClick={handleLogOut}
        className={`text-white p-1 absolute left-0 top-0 bg-gray-800 border border-gray-700 rounded-md button ${itemSize} group-hover:opacity-100 opacity-0 transition`}
        title='Sign out'
      >
        <LogOutIcon className='text-gray-500 size-full' />
      </button>
      <img
        src={avatarUrl}
        alt='User Avatar'
        className={`${itemSize} rounded-full absolute top-0 right-0`}
      />
    </div>
  )
}
