import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const supabase = createRouteHandlerClient({ cookies })

  const data = await supabase.from('lists').select('id, name, color').eq('id', id)
  if (data.error) NextResponse.json({ success: false }, { status: data.status })

  return NextResponse.json({ data: data.data }, { status: 200 })
}
