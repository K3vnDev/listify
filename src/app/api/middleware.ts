import { Response } from '@api/response'
import type { NextRequest } from 'next/server'

type Next = (listId: string) => void

export const middleware = {
  listId: async (request: NextRequest, next: Next) => {
    const { searchParams } = new URL(request.url)
    const listId = searchParams.get('list-id')

    if (!listId) return Response(false, 400, { msg: 'List id missing or invalid' })
    return await next(listId)
  }
}
