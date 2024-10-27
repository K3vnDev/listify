import { middleware } from '@/app/api/middleware'
import { Response } from '@api/response'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

// Get All Tasks from a list
export const GET = async (request: NextRequest) =>
  middleware.listId(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('tasks')
      .select('id, text, done')
      .eq('list_id', listId)

    if (error) return Response(false, status)
    return Response(true, 200, 'OK', data)
  })

// Update task row (text or done column)
export const PATCH = async (request: NextRequest) =>
  middleware.listId(request, async listId => {
    const { target, value, taskId } = (await request.json()) as RequestJSON

    if (!taskId || typeof taskId !== 'string')
      return Response(false, 400, 'Task id missing or invalid')

    // biome-ignore format: <>
    if (!((typeof value === 'string' && target === 'text') ||
        (typeof value === 'boolean' && target === 'done')) || value === undefined
    )
      return Response(false, 400, 'Target and values are missing or invalid')

    const supabase = createRouteHandlerClient({ cookies })

    const updateObj = {}
    ;(updateObj as any)[target] = value

    const { error, status } = await supabase
      .from('tasks')
      .update(updateObj)
      .eq('list_id', listId)
      .eq('id', taskId)

    if (error) return Response(false, status)
    return Response(true, 200)
  })

const TARGETS = ['done', 'text'] as const

interface RequestJSON {
  target?: (typeof TARGETS)[number]
  value?: string | boolean
  taskId?: string
}

// Create new task and get its id
export const POST = (request: NextRequest) =>
  middleware.listId(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error, status } = await supabase
      .from('tasks')
      .insert([{ list_id: listId }])
      .select('id')

    if (error) return Response(false, status)
    return Response(true, 201, 'OK', data)
  })

// Delete task
export const DELETE = (request: NextRequest) =>
  middleware.listId(request, async listId => {
    const supabase = createRouteHandlerClient({ cookies })
    const { taskId } = await request.json()

    if (!taskId || typeof taskId !== 'string')
      return Response(false, 400, 'Task id missing or invalid')

    const { error, status } = await supabase
      .from('tasks')
      .delete()
      .eq('list_id', listId)
      .eq('id', taskId)

    if (error) return Response(false, status)
    return Response(true, 200)
  })
