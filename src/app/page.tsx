import { AppLogo } from '@/components/AppLogo'
import { AppName } from '@/components/AppName'
import { AuthButton } from '@/components/AuthButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const auth = await supabase.auth.getUser()
  const { user } = auth.data

  if (user !== null) redirect('/mylists')

  return (
    <main className='flex flex-col m-auto gap-8'>
      <div className='flex flex-col gap-2 items-center'>
        <span className='text-[#aaa] text-2xl font-semibold'>WELCOME TO</span>
        <div className='flex gap-4 items-center'>
          <AppLogo className='size-10' />
          <AppName className='text-5xl' />
        </div>
      </div>
      <AuthButton />
    </main>
  )
}
