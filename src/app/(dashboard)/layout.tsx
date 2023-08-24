import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = await getAuthSession()

	if (!session) notFound()

	return <div>{children}</div>
}
