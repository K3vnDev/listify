import { middleware } from '@api/middleware'
import { Response } from '@api/response'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

// Get All Lists
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

// Update list row (name or color column)
export const PATCH = async (request: NextRequest) =>
  middleware.listId(request, async listId => {
    const { target, value } = (await request.json()) as RequestJSON

    if (typeof value !== 'string' || typeof target !== 'string' || !TARGETS.includes(target))
      return Response(false, 400, 'Target and values are missing or invalid')

    const supabase = createRouteHandlerClient({ cookies })

    const updateObj = {}
    ;(updateObj as any)[target] = value

    // biome-ignore format: <>
    const { error, status } = await supabase
    .from('lists')
    .update(updateObj)
    .eq('id', listId)

    if (error) return Response(false, status)
    return Response(true, 200)
  })

const TARGETS = ['name', 'color'] as const

interface RequestJSON {
  target?: (typeof TARGETS)[number]
  value?: string
}
