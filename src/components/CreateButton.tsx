'use client'

import { LoadingIcon, PlusIcon } from '@/icons'

interface Props {
  onClick: () => void
  loading?: boolean
  id?: string
}

export const CreateButton = ({ onClick, id, loading = false }: Props) => {
  const className = 'size-4 text-white stroke-[3px]'

  return (
    <button
      {...{ id, onClick }}
      className='button bg-green-600 rounded px-2 py-1 flex items-center gap-1'
      disabled={loading}
    >
      {
        // biome-ignore format: <>
        loading 
          ? <LoadingIcon className={`${className} animate-spin`} />
          : <PlusIcon {...{ className }} />
      }
      <span className='text-white text-sm text-nowrap'>New</span>
    </button>
  )
}
