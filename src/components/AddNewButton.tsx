'use client'

interface Props {
  onClick: () => void
}

export const AddNewButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className='bg-green-600 rounded text-white px-2 py-1 text-sm text-nowrap'
    >
      + New
    </button>
  )
}
