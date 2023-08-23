import { getAuthSession } from '@/lib/auth'

export default async function DashboardPage() {
	const session = await getAuthSession()

	return <div></div>
}
