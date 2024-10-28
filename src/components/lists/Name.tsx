import { PencilIcon } from '@/icons'

interface Props {
  name?: string
}

export const Name = ({ name }: Props) => {
  if (name === undefined) return <span className='h-7 rounded-md w-1/3 bg-zinc-500/30' />

  return (
    <div className='flex items-center gap-2 overflow-hidden group cursor-pointer'>
      <h3 className='font-bold text-2xl text-nowrap text-ellipsis overflow-hidden'>{name}</h3>
      <PencilIcon className='size-5 min-w-5 hidden group-hover:block text-zinc-800' />
    </div>
  )
}
