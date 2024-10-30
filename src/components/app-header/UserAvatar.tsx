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
    router.refresh()
  }

  return (
    <div className='flex gap-4 items-center'>
      <button
        onClick={handleLogOut}
        className='text-white p-[.3125rem] bg-gray-900 border border-gray-800 rounded-lg button'
        title='Sign out'
      >
        <LogOutIcon className='text-gray-700 w-6' />
      </button>
      <img src={avatarUrl} alt='User Avatar' className='size-7 rounded-full' />
    </div>
  )
}
