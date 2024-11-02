import { UserAvatar } from '@/components/app-header/UserAvatar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AppNameAndLogo } from './AppNameAndLogo'

export default async function AppHeader() {
  const supabase = createServerComponentClient({ cookies })

  const auth = await await supabase.auth.getUser()
  const { user } = auth.data
  if (user === null) return

  const { avatar_url } = user.user_metadata

  return (
    <header className='flex justify-between mt-8'>
      <AppNameAndLogo />
      <UserAvatar avatarUrl={avatar_url} />
    </header>
  )
}
