import AppHeader from '@/components/app-header/AppHeader'
import { AddNewListButton } from '@/components/lists/AddNewListButton'
import { UserLists } from '@/components/lists/UserLists'
import { GridIcon } from '@/icons'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const poppins = Poppins({ weight: ['400', '500', '600', '700'], variable: '--ff-poppins' })

export default async function MyLists() {
  const supabase = createServerComponentClient({ cookies })

  const auth = await supabase.auth.getUser()
  const { user } = auth.data
  if (user === null) return redirect('/')

  return (
    <main className='flex flex-col gap-6'>
      <header className='flex justify-between items-center'>
        <div className={`flex gap-5 font-medium text-lg ${poppins.className}`}>
          <h3 className='text-white'>My Lists</h3>
          <AddNewListButton />
        </div>
        <GridIcon className='size-8 fill-gray-500' />
      </header>
      <UserLists />
    </main>
  )
}
