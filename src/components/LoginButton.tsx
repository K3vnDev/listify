'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const AuthButton = () => {
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <button onClick={handleSignIn} className='text-white border border-white p-4 rounded-lg'>
      Login with Github
    </button>
  )
}
