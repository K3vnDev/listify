import { listIdMiddleware } from '@api/listIdMiddleware'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return listIdMiddleware(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('lists')
      .select('id, name, color')
      .eq('id', listId)

    if (error) return NextResponse.json({ success: false }, { status })

    if (data.length === 0)
      return NextResponse.json({ success: false, message: 'List not found' }, { status: 404 })

    const [list] = data
    return NextResponse.json({ data: list }, { status: 200 })
  })
}
