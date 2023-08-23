import { getAuthSession } from '@/lib/auth'
import { addFriendSchema } from '@/lib/validations/add-friend'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const body = await req.json()
		const { email: emailToAdd } = addFriendSchema.parse(body.email)

		const RESTResponse = await fetch(
			`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
				},
				cache: 'no-store',
			},
		)

		const data = (await RESTResponse.json()) as { result: string | null }

		const idToAdd = data.result

		if (!idToAdd)
			return new NextResponse('This person does not exist.', { status: 400 })

		const session = await getAuthSession()

		if (!session) return new NextResponse('Unauthorized', { status: 401 })

		if (idToAdd === session.user.id)
			return new NextResponse('You cannot add yourself as a friend', {
				status: 400,
			})
	} catch (error) {}
}
