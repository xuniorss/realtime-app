import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { addFriendSchema } from '@/lib/validations/add-friend'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const { email: emailToAdd } = addFriendSchema.parse(body.email)

		const idToAdd = (await fetchRedis(
			'get',
			`user:email:${emailToAdd}`,
		)) as string

		if (!idToAdd)
			return new NextResponse('This person does not exist.', { status: 400 })

		const session = await getServerSession(authOptions)

		if (!session) return new NextResponse('Unauthorized', { status: 401 })

		if (idToAdd === session.user.id) {
			return new NextResponse('You cannot add yourself as a friend', {
				status: 400,
			})
		}

		// check if user is already added
		const isAlreadyAdded = (await fetchRedis(
			'sismember',
			`user:${idToAdd}:incoming_friend_requests`,
			session.user.id,
		)) as 0 | 1

		if (isAlreadyAdded)
			return new NextResponse('Already added this user', { status: 400 })

		// check if user is already added
		const isAlreadyFriends = (await fetchRedis(
			'sismember',
			`user:${session.user.id}:friends`,
			idToAdd,
		)) as 0 | 1

		if (isAlreadyFriends) {
			return new NextResponse('Already friends with this user', {
				status: 400,
			})
		}

		await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

		return new NextResponse('OK')
	} catch (error) {
		if (error instanceof z.ZodError)
			return new NextResponse('Invalid request payload', { status: 422 })

		return new NextResponse('Invalid request', { status: 400 })
	}
}
