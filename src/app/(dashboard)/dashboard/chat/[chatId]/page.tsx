import { fetchRedis } from '@/helpers/redis'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { messageArrayValidator } from '@/lib/validations/message'
import { notFound } from 'next/navigation'

interface ChatIdPageProps {
	params: { chatId: string }
}

const getChatMessages = async (chatId: string) => {
	try {
		const result: string[] = await fetchRedis(
			'zrange',
			`chat:${chatId}:messages`,
			0,
			-1,
		)

		const dbMessages = result.map((message) => JSON.parse(message) as Message)
		const reversedDbMessages = dbMessages.reverse()

		return messageArrayValidator.parse(reversedDbMessages)
	} catch (error) {
		notFound()
	}
}

export default async function ChatIdPage({ params }: ChatIdPageProps) {
	const { chatId } = params
	const session = await getAuthSession()

	if (!session) notFound()

	const { user } = session

	const [userId1, userId2] = chatId.split('--')

	if (user.id !== userId1 && user.id !== userId2) notFound()

	const chatPartnerId = user.id === userId1 ? userId2 : userId1
	const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User
	const initialMessages = await getChatMessages(chatId)

	return <div></div>
}
