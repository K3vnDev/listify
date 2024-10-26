import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Lists } from './Lists'

export const ListsSection = async () => {
  const supabase = createServerComponentClient({ cookies })

  const { data: lists } = await supabase.from('lists').select('id, name, color')
  if (!lists) return

  return <Lists lists={lists} />
}
