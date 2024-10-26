import { listIdMiddleware } from '@api/listIdMiddleware'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

// Get All Tasks
export async function GET(req: NextRequest) {
  return listIdMiddleware(req, async (_, listId) => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('tasks')
      .select('id, text, done')
      .eq('list_id', listId)

    if (error) return NextResponse.json({ success: false }, { status })
    return NextResponse.json({ success: true, data }, { status: 200 })
  })
}

const TARGETS = ['text', 'done']
type RequestJSON = { target?: string; value?: boolean; taskId?: string }

// Update Task
export async function PATCH(req: NextRequest) {
  return listIdMiddleware(req, async (request, listId) => {
    const { target, value, taskId } = (await request.json()) as RequestJSON

    if (!TARGETS.includes(target ?? '') || typeof value !== 'boolean' || typeof taskId !== 'string')
      return NextResponse.json(
        { success: false, message: 'Some values are missing or invalid' },
        { status: 400 }
      )

    const supabase = createRouteHandlerClient({ cookies })

    switch (target) {
      case 'done': {
        const { error, status } = await supabase
          .from('tasks')
          .update({ done: value })
          .eq('list_id', listId)
          .eq('id', taskId)

        if (error) return NextResponse.json({ success: false }, { status })
        return NextResponse.json({ success: true }, { status: 200 })
      }
    }
  })
}
