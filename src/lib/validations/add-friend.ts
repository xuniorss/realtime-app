import { z } from 'zod'

export const addFriendSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Necessário informar o e-mail.' })
		.email({ message: 'E-mail inválido.' }),
})

export type AddFriendProps = z.infer<typeof addFriendSchema>
