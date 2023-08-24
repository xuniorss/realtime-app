import { fetchRedis } from '@/helpers/redis'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const { id: idToAdd } = z.object({ id: z.string() }).parse(body)

		const session = await getAuthSession()

		if (!session) return new NextResponse('Unauthorized', { status: 401 })

		// verify both users are not already friends
		const isAlreadyFriends = await fetchRedis(
			'sismember',
			`user:${session.user.id}:friends`,
			idToAdd,
		)

		if (isAlreadyFriends)
			return new NextResponse('Already friends', { status: 400 })

		const hasFriendRequest = await fetchRedis(
			'sismember',
			`user:${session.user.id}:incoming_friend_requests`,
			idToAdd,
		)

		if (!hasFriendRequest)
			return new NextResponse('No friend request', { status: 400 })

		const [userRaw, friendRaw] = (await Promise.all([
			fetchRedis('get', `user:${session.user.id}`),
			fetchRedis('get', `user:${idToAdd}`),
		])) as [string, string]

		const user = JSON.parse(userRaw) as User
		const friend = JSON.parse(friendRaw) as User

		// notify added user

		await Promise.all([
			db.sadd(`user:${session.user.id}:friends`, idToAdd),
			db.sadd(`user:${idToAdd}:friends`, session.user.id),
			db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd),
		])

		return new NextResponse('OK')
	} catch (error) {
		if (error instanceof z.ZodError)
			return new NextResponse('Invalid request payload', { status: 422 })

		return new NextResponse('Invalid request', { status: 400 })
	}
}
