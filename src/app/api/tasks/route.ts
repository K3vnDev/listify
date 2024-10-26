import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const listId = searchParams.get('list-id')

  const supabase = createRouteHandlerClient({ cookies })

  const data = await supabase.from('tasks').select('id, text, done').eq('list_id', listId)
  if (data.error) NextResponse.json({ success: false }, { status: data.status })

  return NextResponse.json({ data: data.data }, { status: 200 })
}
