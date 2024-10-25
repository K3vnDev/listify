import Link from 'next/link'

export const AppNameAndLogo = () => {
  return (
    <Link href='/mylists' className='flex items-center gap-4'>
      <div className='size-8 rounded-lg bg-slate-200' />
      <h2 className='text-4xl font-bold text-slate-200'>LISTIFY</h2>
    </Link>
  )
}
