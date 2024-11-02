import { fonts } from '@/consts'
import Image from 'next/image'
import Link from 'next/link'

export const AppNameAndLogo = () => {
  return (
    <Link href='/mylists' className='flex items-center gap-4'>
      <Image
        src='/app-logo.png'
        className='size-8 text-white text-xs'
        alt='App logo'
        width={32}
        height={32}
      />
      <h2 className={`text-4xl font-bold text-slate-200 ${fonts.poppins}`}>LISTIFY</h2>
    </Link>
  )
}
