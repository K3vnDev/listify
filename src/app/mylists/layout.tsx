import AppHeader from '@/components/AppHeader'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}
