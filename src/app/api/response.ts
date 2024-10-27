import { NextResponse } from 'next/server'

export const Response = (success: boolean, status: number, message?: string, data?: any) =>
  NextResponse.json({ success, message, data }, { status })
