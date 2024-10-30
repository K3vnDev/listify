import { Response } from '@api/response'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Get all lists
export const GET = async () => {
  const supabase = createRouteHandlerClient({ cookies })
  const { data, error, status } = await supabase.from('lists').select('id, name, color')

  if (error) return Response(false, status)
  return Response(true, 200, { data })
}
