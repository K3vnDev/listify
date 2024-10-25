import AppHeader from '@/components/app-header/AppHeader'

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
