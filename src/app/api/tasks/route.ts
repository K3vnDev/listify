import { listIdMiddleware } from '@api/listIdMiddleware'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

// Get All Tasks
export const GET = async (request: NextRequest) =>
  listIdMiddleware(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('tasks')
      .select('id, text, done')
      .eq('list_id', listId)

    if (error) return NextResponse.json({ success: false }, { status })
    return NextResponse.json({ success: true, data }, { status: 200 })
  })

// Update task row (text or done column)
export const PATCH = async (request: NextRequest) =>
  listIdMiddleware(request, async listId => {
    const { target, value, taskId } = (await request.json()) as RequestJSON

    if (!target || !TARGETS.includes(target) || value === undefined || typeof taskId !== 'string')
      return NextResponse.json(
        { success: false, message: 'Some values are missing or invalid' },
        { status: 400 }
      )
    const supabase = createRouteHandlerClient({ cookies })

    const updateObj = {}
    ;(updateObj as any)[target] = value

    const { error, status } = await supabase
      .from('tasks')
      .update(updateObj)
      .eq('list_id', listId)
      .eq('id', taskId)

    if (error) return NextResponse.json({ success: false }, { status })
    return NextResponse.json({ success: true }, { status: 200 })
  })

const TARGETS = ['done', 'text'] as const

interface RequestJSON {
  target?: (typeof TARGETS)[number]
  value?: string | boolean
  taskId?: string
}

// Create new task and get its id
export const POST = (request: NextRequest) =>
  listIdMiddleware(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('tasks')
      .insert([{ list_id: listId }])
      .select('id')

    if (error) return NextResponse.json({ success: false }, { status })
    return NextResponse.json({ success: true, data }, { status: 200 })
  })
