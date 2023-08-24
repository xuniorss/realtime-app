'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface FriendRequestProps {
	sessionId: string
	initialUnseenRequestsCount: number
}

export const FriendRequestSidebarOption = ({
	sessionId,
	initialUnseenRequestsCount,
}: FriendRequestProps) => {
	const [unseenRequestCount, setUnseeRequestCount] = useState<number>(
		initialUnseenRequestsCount,
	)

	return (
		<Link
			href="/dashboard/requests"
			className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
		>
			<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
				<User className="h-4 w-4" />
			</span>
			<p className="truncate">Pedidos de amizade</p>
			{unseenRequestCount > 0 && (
				<div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-sm text-white">
					{unseenRequestCount}
				</div>
			)}
		</Link>
	)
}
