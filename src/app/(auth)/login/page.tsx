import { LoginGoogle } from '../components/LoginGoogle'

export default function LoginPage() {
	return (
		<>
			<article className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<section className="flex w-full max-w-md flex-col items-center space-y-8">
					<div className="flex flex-col items-center gap-8">
						logo
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Faça login em sua conta
						</h2>
					</div>
					<LoginGoogle />
				</section>
			</article>
		</>
	)
}
