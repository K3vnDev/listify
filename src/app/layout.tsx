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
      <body className='p-6 flex flex-col gap-10 max-w-4xl mx-auto'>{children}</body>
    </html>
  )
}
