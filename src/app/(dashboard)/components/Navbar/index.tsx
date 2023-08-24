import { Icons } from '@/components/Icons'
import { Session } from 'next-auth'
import Link from 'next/link'
import { SidebarOption } from '../../layout'
import { FriendRequestSidebarOption } from '../FriendRequestSidebarOption'
import { SignOutButton } from '../SignOutButton'

interface NavbarProps {
	session: Session
	sidebarOptions: SidebarOption[]
	unseenRequestCount: number
}

export const Navbar = ({
	session,
	sidebarOptions,
	unseenRequestCount,
}: NavbarProps) => {
	return (
		<nav className="flex flex-1 flex-col">
			<ul role="list" className="flex flex-1 flex-col gap-y-7">
				<li>chats that this user has</li>
				<li>
					<h2 className="text-xs font-semibold leading-6 text-gray-400">
						Visão geral
					</h2>
					<ul role="list" className="-mx-2 mt-2 space-y-1">
						{sidebarOptions.map((option) => {
							const Icon = Icons[option.Icon]
							return (
								<li key={option.id}>
									<Link
										href={option.href}
										className="group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
									>
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
											<Icon className="h-4 w-4" />
										</span>
										<p className="truncate">{option.name}</p>
									</Link>
								</li>
							)
						})}
					</ul>
				</li>

				<li>
					<FriendRequestSidebarOption
						sessionId={session.user.id}
						initialUnseenRequestsCount={unseenRequestCount}
					/>
				</li>

				<li className="-mx-6 mt-auto flex items-center">
					<article className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
						{/* <div className="relative h-8 w-8 bg-gray-50">
							<Image
								fill
								referrerPolicy="no-referrer"
								className="rounded-full"
								src={session.user.image || ''}
								alt="Sua foto de perfil"
							/>
						</div> */}
						<p className="sr-only">Seu perfil</p>
						<div className="flex flex-col">
							<p aria-hidden="true" className="truncate">
								{session.user.name}
							</p>
							<p className="truncate text-xs" aria-hidden="true">
								{session.user.email}
							</p>
						</div>
					</article>
					<SignOutButton className="aspect-square h-full" />
				</li>
			</ul>
		</nav>
	)
}
