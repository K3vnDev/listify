'use client'

import { fonts } from '@/consts'
import { GithubIcon } from '@/icons'
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
    <button
      onClick={handleSignIn}
      className={`
        bg-zinc-800 border-2 border-zinc-700 rounded-full px-4 py-2 flex items-center gap-3 
        ${fonts.poppins} button
        `}
    >
      <GithubIcon className='size-8' />
      <span className='text-white text-base text-nowrap'>Login with Github</span>
    </button>
  )
}
