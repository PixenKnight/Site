import { Link, useLocation } from '@tanstack/react-router'

import { useEffect, useState } from 'react'
import {
	Home,
	Menu,
	SquareCode,
	CircleUserRound,
	BriefcaseBusiness,
	X,
	MailPlus
} from 'lucide-react'

import { useWindowWidth } from '@react-hook/window-size'

const orderedRoutes = [
	{path: '/', name: 'Home', icon: Home},
	{path: '/personal', name: 'Personal', icon: CircleUserRound},
	// {path: '/professional', name: 'Professional', icon: SquareCode},
	// {path: '/portfolio', name: 'Portfolio', icon: BriefcaseBusiness},
	{path: '/contact', name: 'Contact', icon: MailPlus},
]

function BurgerMenu({ isOpen, setIsOpen }: {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [groupedExpanded, setGroupedExpanded] = useState<
		Record<string, boolean>
	>({})

	const sideMenu = []
	for (const route of orderedRoutes) {
		sideMenu.push(
			<Link
				key={route.path}
				to={route.path}
				onClick={() => setIsOpen(false)}
				className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
				activeProps={{
					className:
						'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
				}}
			>
				{<route.icon size={20} />}
				<span className="font-medium">{route.name}</span>
			</Link>
		)
	}

	return (
		<aside
			className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-100 transform transition-transform duration-300 ease-in-out flex flex-col ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="flex items-center justify-between p-4 border-b border-gray-700">
				<h2 className="text-xl font-bold">Navigation</h2>
				<button
					onClick={() => setIsOpen(false)}
					className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
					aria-label="Close menu"
				>
					<X size={24} />
				</button>
			</div>

			<nav className="flex-1 p-4 overflow-y-auto">
				{sideMenu}

				{/* Demo Links Start

				<Link
					to="/demo/start/server-funcs"
					onClick={() => setIsOpen(false)}
					className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
					activeProps={{
						className:
							'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
					}}
				>
					<SquareFunction size={20} />
					<span className="font-medium">Start - Server Functions</span>
				</Link>

				<Link
					to="/demo/start/api-request"
					onClick={() => setIsOpen(false)}
					className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
					activeProps={{
						className:
							'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
					}}
				>
					<Network size={20} />
					<span className="font-medium">Start - API Request</span>
				</Link>

				<div className="flex flex-row justify-between">
					<Link
						to="/demo/start/ssr"
						onClick={() => setIsOpen(false)}
						className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								'flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
						}}
					>
						<StickyNote size={20} />
						<span className="font-medium">Start - SSR Demos</span>
					</Link>
					<button
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
						onClick={() =>
							setGroupedExpanded((prev) => ({
								...prev,
								StartSSRDemo: !prev.StartSSRDemo,
							}))
						}
					>
						{groupedExpanded.StartSSRDemo ? (
							<ChevronDown size={20} />
						) : (
							<ChevronRight size={20} />
						)}
					</button>
				</div>
				{groupedExpanded.StartSSRDemo && (
					<div className="flex flex-col ml-4">
						<Link
							to="/demo/start/ssr/spa-mode"
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
							activeProps={{
								className:
									'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
							}}
						>
							<StickyNote size={20} />
							<span className="font-medium">SPA Mode</span>
						</Link>

						<Link
							to="/demo/start/ssr/full-ssr"
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
							activeProps={{
								className:
									'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
							}}
						>
							<StickyNote size={20} />
							<span className="font-medium">Full SSR</span>
						</Link>

						<Link
							to="/demo/start/ssr/data-only"
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
							activeProps={{
								className:
									'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
							}}
						>
							<StickyNote size={20} />
							<span className="font-medium">Data Only</span>
						</Link>
					</div>
				)}

				Demo Links End */}
			</nav>
		</aside>
	)
}

function HeaderNav({ setIsOpen }: {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [ burgerOverNavbar, setBurgerOverNavbar ] = useState(false)
	const windowWidth = useWindowWidth()
	const location = useLocation()

	const highlightRoute = (path: string) => {
		return location.pathname === path
			? 'transition-colors text-cyan-400 font-semibold border-y-2'
			: 'transition-colors text-white font-medium hover:text-cyan-400'
	}

	useEffect(() => {
		if (windowWidth >= 768) {
			setBurgerOverNavbar(false)
		} else {
			setBurgerOverNavbar(true)
		}
	}, [windowWidth])

	const navbarLinks = []
	for (const route of orderedRoutes) {
		// Remove leading and trailing slashes for cleaner display
		navbarLinks.push(
			<Link
				key={route.path}
				to={route.path}
				className={`pb-[0.12rem] ${highlightRoute(route.path)}`}
			>
				{route.name}
			</Link>
		)
	}

	return (
		<div>
			{!burgerOverNavbar && (
				<nav className="mr-4 flex items-center gap-6">
					{navbarLinks}
				</nav>
			)}
			
			{burgerOverNavbar && (
				<button
					onClick={() => setIsOpen(isOpen => !isOpen)}
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>
			)}
		</div>
	)
}

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<header className="p-4 flex items-center bg-black text-white shadow-lg justify-between fixed top-0 left-0 right-0 sticky z-50">
				<h1 className="ml-4 text-4xl font-bold italic">
					<Link to="/">
						Paul
					</Link>
				</h1>
				<HeaderNav
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</header>
			<BurgerMenu
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	)
}
