import { type NextRequest, NextResponse } from 'next/server'

type Next = (listId: string) => void

export const listIdMiddleware = async (request: NextRequest, next: Next) => {
  const { searchParams } = new URL(request.url)
  const listId = searchParams.get('list-id')

  if (!listId) return NextResponse.json({ success: false }, { status: 400 })
  return await next(listId)
}
