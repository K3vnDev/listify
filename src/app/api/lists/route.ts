import { middleware } from '@api/middleware'
import { Response } from '@api/response'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) =>
  middleware.listId(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('lists')
      .select('id, name, color')
      .eq('id', listId)

    if (error) return Response(false, status)
    if (data.length === 0) return Response(false, 404, 'Requested list not found')

    const [list] = data
    return Response(true, 200, 'OK', list)
  })
