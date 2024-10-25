import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // const supabase = createRouteHandlerClient({ cookies })
  // const {
  //   data: { session }
  // } = await supabase.auth.getSession()
  // if (session === null)
  //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  // const data = await supabase
  //   .from('lists')
  //   .select('(id, name, color)')
  //   .eq('user_id', session.user.id)
  // console.log(data)
}
