import { z } from 'zod'

export const MessageSchema = z.object({
	id: z.string(),
	senderId: z.string(),
	text: z.string(),
	timestamp: z.number(),
})

export const messageArrayValidator = z.array(MessageSchema)

export type MessageProps = z.infer<typeof MessageSchema>
