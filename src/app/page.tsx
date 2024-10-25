import { AuthButton } from '@/components/LoginButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session !== null) redirect('/mylists')

  return (
    <main>
      <AuthButton />
    </main>
  )
}
