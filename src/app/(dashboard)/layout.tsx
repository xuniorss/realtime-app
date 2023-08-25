import { Icon, Icons } from '@/components/Icons'
import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id'
import { fetchRedis } from '@/helpers/redis'
import { getAuthSession } from '@/lib/auth'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { Navbar } from './components/Navbar'

export const revalidate = 0

export const metadata: Metadata = {
	title: 'FriendZone | Dashboard',
	description: 'Your dashboard',
}

export type SidebarOption = {
	id: number
	name: string
	href: string
	Icon: Icon
}

const sidebarOptions: SidebarOption[] = [
	{ id: 1, name: 'Adicionar amigo', href: '/dashboard/add', Icon: 'UserPlus' },
]

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = await getAuthSession()

	if (!session) notFound()

	const friends = await getFriendsByUserId(session.user.id)

	const unseenRequestCount = (
		(await fetchRedis(
			'smembers',
			`user:${session.user.id}:incoming_friend_requests`,
		)) as User[]
	).length

	return (
		<div className="flex h-screen w-full">
			<aside className="hidden h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 md:flex">
				<Link href="/dashboard" className="flex h-16 shrink-0 items-center">
					<Icons.logo className="h-8 w-auto text-indigo-600" />
				</Link>

				{friends.length > 0 && (
					<h1 className="text-xs font-semibold leading-6 text-gray-400">
						Seus bate-papos
					</h1>
				)}

				<Navbar
					session={session}
					sidebarOptions={sidebarOptions}
					unseenRequestCount={unseenRequestCount}
					friends={friends}
				/>
			</aside>
			<main className="container max-h-screen w-full py-16 md:py-12">
				{children}
			</main>
		</div>
	)
}
