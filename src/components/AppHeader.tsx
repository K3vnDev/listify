import { UserAvatar } from '@components/UserAvatar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function AppHeader() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) return

  const { data } = await supabase.from('users').select('avatar_url').eq('id', user.id)
  const [{ avatar_url }] = data as Array<{ avatar_url: string }>

  return (
    <header className='flex justify-between'>
      <div className='flex items-center gap-4'>
        <div className='size-8 rounded-lg bg-slate-200' />
        <h2 className='text-4xl font-bold text-slate-200'>LISTIFY</h2>
      </div>
      <UserAvatar avatarUrl={avatar_url} />
    </header>
  )
}
