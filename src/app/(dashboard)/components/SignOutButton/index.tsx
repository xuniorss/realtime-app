'use client'

import { Button } from '@/components/ui/Button'
import { Loader2, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ButtonHTMLAttributes, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SignOutButton = ({ ...props }: SignOutButtonProps) => {
	const [isSigningOut, setIsSigningOut] = useState(false)

	const handleLogout = useCallback(async () => {
		try {
			setIsSigningOut(true)
			await signOut()
		} catch (error) {
			toast.error('Ocorreu um problema ao sair')
		} finally {
			setIsSigningOut(false)
		}
	}, [])

	return (
		<Button {...props} variant="ghost" onClick={handleLogout}>
			{isSigningOut && <Loader2 className="h-4 w-4 animate-spin" />}
			{!isSigningOut && <LogOut className="h-4 w-4" />}
		</Button>
	)
}
