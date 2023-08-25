'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SidebarChatListProps {
	friends: User[]
}

export const SidebarChatList = ({ friends }: SidebarChatListProps) => {
	const [unseenMessages, setUnseenMessages] = useState<Message[]>([])

	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (pathname?.includes('chat')) {
			setUnseenMessages((prev) =>
				prev.filter((msg) => !pathname.includes(msg.receiverId)),
			)
		}
	}, [pathname])

	return (
		<ul role="list" className="-mx-2 max-h-[25rem] space-y-1 overflow-y-auto">
			{friends.sort().map((friend) => {
				const unseenMessagesCount = unseenMessages.filter(
					(unseenMsg) => unseenMsg.senderId === friend.id,
				).length

				return <li key={friend.id}></li>
			})}
		</ul>
	)
}
