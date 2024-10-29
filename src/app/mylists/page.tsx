import { ItemListsHeader } from '@components/lists/ItemListsHeader'
import { ItemListsSection } from '@components/lists/ItemListsSection'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function MyLists() {
  const supabase = createServerComponentClient({ cookies })

  const auth = await supabase.auth.getUser()
  const { user } = auth.data

  if (user === null) return redirect('/')

  return (
    <main className='flex flex-col gap-6'>
      <ItemListsHeader />
      <ItemListsSection />
    </main>
  )
}
