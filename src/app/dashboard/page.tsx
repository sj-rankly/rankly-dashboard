import { Dashboard } from '@/components/Dashboard'

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return <Dashboard initialTab={searchParams.tab as string} />
}
