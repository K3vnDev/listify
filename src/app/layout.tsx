import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Listify',
  description: 'Manage your tasks.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='px-6 flex flex-col gap-11 max-w-5xl mx-auto'>{children}</body>
    </html>
  )
}
