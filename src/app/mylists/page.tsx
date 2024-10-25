import { AddNewButton } from '@/components/AddNewButton'
import { AddNewListButton } from '@/components/AddNewListButton'
import AppHeader from '@/components/AppHeader'
import { GridIcon } from '@/icons'
import { LISTS_MOCK } from '@/mocks'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const poppins = Poppins({ weight: ['400', '500', '600', '700'], variable: '--ff-poppins' })

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) redirect('/')

  const handleAddNewList = () => {}

  return (
    <>
      <AppHeader />
      <main className='flex flex-col gap-6'>
        <header className='flex justify-between items-center'>
          <div className={`flex gap-5 font-medium text-lg ${poppins.className}`}>
            <h3 className='text-white'>My Lists</h3>
            <AddNewListButton />
          </div>
          <GridIcon className='size-8 fill-gray-500' />
        </header>
        <ul className='flex flex-col gap-3'>
          {LISTS_MOCK.map(({ color, name }, i) => (
            <li
              key={i}
              className='bg-[#1A1C21] border border-[#222] p-4 pr-8 rounded-lg flex gap-4 w-fit'
            >
              <div className='size-6 rounded' style={{ background: color }} />
              <span className='text-white'>{name}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
