import { DEFAULT_LIST_NAME } from '@/consts'
import { useActionOnClick } from '@/hooks/useActionOnClick'
import { useListPatch } from '@/hooks/useListPatch'
import { PencilIcon } from '@/icons'
import { useListsStore } from '@/store/lists/useListsStore'
import { useEffect, useRef, useState } from 'react'

interface Props {
  name?: string
}

export const Name = ({ name }: Props) => {
  const [isEditing, setIsediting] = useState(false)
  const setListName = useListsStore(s => s.setListName)
  const inputRef = useRef(null)

  const { trigger } = useListPatch({
    prevValue: name,
    target: 'name',
    onError: prevValue => {
      setListName(prevValue ?? '')
    }
  })

  useActionOnClick(
    clickedInside => {
      if (clickedInside !== isEditing) setIsediting(clickedInside)
    },
    { selectors: ['#list-name'] }
  )

  useEffect(() => {
    if (inputRef.current && isEditing) (inputRef.current as HTMLInputElement).focus()
  }, [isEditing, inputRef.current])

  useEffect(() => {
    if (name?.trim() === '' && !isEditing) {
      setListName(DEFAULT_LIST_NAME)
      trigger(DEFAULT_LIST_NAME)
    }
  }, [isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setListName(value)
    if (value.trim() !== '') trigger(value)
  }

  if (name === undefined) return <span className='h-7 rounded-md w-1/3 bg-zinc-500/30' />

  return (
    <div className='flex items-center gap-2 overflow-hidden group cursor-pointer' id='list-name'>
      {!isEditing ? (
        <>
          <h3 className='font-bold text-2xl text-nowrap text-ellipsis overflow-hidden'>{name}</h3>
          <PencilIcon className='size-5 min-w-5 hidden group-hover:block text-zinc-800' />
        </>
      ) : (
        <input
          value={name}
          onChange={handleChange}
          className='border-editing outline-none text-2xl rounded-md bg-zinc-100 size-full [field-sizing:content] px-1'
          ref={inputRef}
        />
      )}
    </div>
  )
}
