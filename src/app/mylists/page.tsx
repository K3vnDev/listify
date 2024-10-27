import { CreateListButton } from '@/components/lists/CreateListButton'
import { ListsSection } from '@/components/lists/ListsSection'
import { GridIcon } from '@/icons'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

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
          <span className='text-white'>My Lists</span>
          <CreateListButton />
        </div>
        <GridIcon className='size-8 fill-gray-500' />
      </header>

      <Suspense>
        <ListsSection />
      </Suspense>
    </main>
  )
}
