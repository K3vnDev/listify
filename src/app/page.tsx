import { AuthButton } from '@/components/LoginButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const auth = await supabase.auth.getUser()
  const { user } = auth.data

  if (user !== null) redirect('/mylists')

  return (
    <main>
      <AuthButton />
    </main>
  )
}
