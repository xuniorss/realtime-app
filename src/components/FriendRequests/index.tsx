'use client'

import axios from 'axios'
import { Check, UserPlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface FriendRequestsProps {
	incomingFriendRequests: IncomingFriendRequest[]
	sessionId: string
}

export const FriendRequests = ({
	incomingFriendRequests,
	sessionId,
}: FriendRequestsProps) => {
	const [friendRequests, setFriendRequests] = useState<
		IncomingFriendRequest[]
	>(incomingFriendRequests)

	const router = useRouter()

	const acceptFriend = useCallback(
		async (senderId: string) => {
			await axios.post('/api/friends/accept', { id: senderId })

			setFriendRequests((prev) =>
				prev.filter((request) => request.senderId !== senderId),
			)

			router.refresh()
		},
		[router],
	)

	const denyFriend = useCallback(
		async (senderId: string) => {
			await axios.post('/api/friends/deny', { id: senderId })

			setFriendRequests((prev) =>
				prev.filter((request) => request.senderId !== senderId),
			)

			router.refresh()
		},
		[router],
	)

	return (
		<>
			{friendRequests.length === 0 && (
				<p className="text-sm text-zinc-500">Nada para mostrar aqui...</p>
			)}
			{friendRequests.length > 0 &&
				friendRequests.map((request) => (
					<article
						key={request.senderId}
						className="flex items-center gap-4"
					>
						<UserPlus className="text-black" />
						<p className="text-lg font-medium">{request.senderEmail}</p>
						<button
							onClick={() => acceptFriend(request.senderId)}
							aria-label="accept friend"
							className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 transition hover:bg-indigo-700 hover:shadow-md"
						>
							<Check className="h-3/4 w-3/4 font-semibold text-white" />
						</button>

						<button
							onClick={() => denyFriend(request.senderId)}
							aria-label="deny friend"
							className="grid h-8 w-8 place-items-center rounded-full bg-red-600 transition hover:bg-red-700 hover:shadow-md"
						>
							<X className="h-3/4 w-3/4 font-semibold text-white" />
						</button>
					</article>
				))}
		</>
	)
}
