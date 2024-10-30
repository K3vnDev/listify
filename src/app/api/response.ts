import { NextResponse } from 'next/server'

interface Info {
  msg?: string
  data?: any
}

export const Response = (success: boolean, status: number, info?: Info) =>
  NextResponse.json({ success, message: info?.msg, data: info?.data }, { status })
