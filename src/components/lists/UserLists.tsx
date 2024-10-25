import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { UserListsItem } from './UserListsItem'

export const UserLists = async () => {
  const supabase = createServerComponentClient({ cookies })

  const { data: lists } = await supabase.from('lists').select('id, name, color')
  if (!lists) return

  return (
    <ul className='flex flex-col gap-3'>
      {lists.map(list => (
        <UserListsItem key={list.id} {...list} />
      ))}
    </ul>
  )
}
