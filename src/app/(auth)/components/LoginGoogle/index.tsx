'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

export const LoginGoogle = () => {
	const [isLoading, setIsLoading] = useState(false)

	const login = useCallback(async () => {
		try {
			setIsLoading(true)
			await signIn('google')
		} catch (error) {
			toast.error('Algo deu errado com seu login.')
		} finally {
			setIsLoading(false)
		}
	}, [])

	return (
		<Button
			isLoading={isLoading}
			type="button"
			className="mx-auto w-full max-w-sm"
			onClick={login}
		>
			{!isLoading && <Icons.google />}
			Google
		</Button>
	)
}
