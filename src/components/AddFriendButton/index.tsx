'use client'

import { AddFriendProps, addFriendSchema } from '@/lib/validations/add-friend'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/Button'

export const AddFriendButton = () => {
	const [showSuccessState, setShowSuccessState] = useState(false)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AddFriendProps>({
		resolver: zodResolver(addFriendSchema),
		defaultValues: { email: '' },
	})

	const addFriend = useCallback(
		async (email: string) => {
			try {
				const validatedEmail = addFriendSchema.parse({ email })

				await axios.post('/api/friends/add', { email: validatedEmail })

				setShowSuccessState(true)
			} catch (error) {
				if (error instanceof z.ZodError) {
					setError('email', { message: error.message })
					return
				}
				if (error instanceof AxiosError) {
					setError('email', { message: error.response?.data })
					return
				}

				setError('email', { message: 'Algo deu errado.' })
			}
		},
		[setError],
	)

	const onSubmit: SubmitHandler<AddFriendProps> = useCallback(
		(data) => {
			addFriend(data.email)
		},
		[addFriend],
	)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
			<label
				htmlFor="email"
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				Adicionar amigo por E-mail
			</label>
			<section className="mt-2 flex gap-4">
				<input
					{...register('email')}
					type="email"
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="email@exemplo.com"
				/>
				<Button type="submit">Adicionar</Button>
			</section>
			<p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
			{showSuccessState && (
				<p className="mt-1 text-sm text-green-600">
					Solicitação de amizade enviada.
				</p>
			)}
		</form>
	)
}
