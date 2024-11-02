import { UserAvatar } from '@/components/UserAvatar'
import { AppLogo } from '@components/AppLogo'
import { AppName } from '@components/AppName'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function AppHeader() {
  const supabase = createServerComponentClient({ cookies })

  const auth = await await supabase.auth.getUser()
  const { user } = auth.data
  if (user === null) return

  const { avatar_url } = user.user_metadata

  return (
    <header className='flex justify-between mt-8'>
      <Link href='/mylists' className='flex items-center gap-4'>
        <AppLogo />
        <AppName />
      </Link>

      <UserAvatar avatarUrl={avatar_url} />
    </header>
  )
}
