import { useWindowWidth } from "@react-hook/window-size";
import { Link, useLocation } from "@tanstack/react-router";
import {
	// BriefcaseBusiness,
	CircleUserRound,
	Home,
	MailPlus,
	Menu,
	SquareCode,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const orderedRoutes = [
	{ path: "/", name: "Home", icon: Home },
	{ path: "/personal", name: "Personal", icon: CircleUserRound },
	{ path: "/professional", name: "Professional", icon: SquareCode },
	// {path: '/portfolio', name: 'Portfolio', icon: BriefcaseBusiness},
	{ path: "/contact", name: "Contact", icon: MailPlus },
];

// Set of randomly-chosen fonts, one of which is applied to the name in the header on each page load
const paulFonts = [
	"'Comic Sans MS'",
	"'Roboto'",
	"'Segoe UI'",
	"'Arial'",
	"'Verdana'",
	"'Trebuchet MS'",
	"'Georgia'",
	"'Garamond'",
	"'Courier New'",
	"'Brush Script MT'",
]

function BurgerMenu({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	// const [groupedExpanded, setGroupedExpanded] = useState<
	// 	Record<string, boolean>
	// >({});

	return (
		<aside
			className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-100 transform transition-transform duration-300 ease-in-out flex flex-col ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div className="flex items-center justify-between p-4 border-b border-gray-700">
				<h2 className="text-xl font-bold">Navigation</h2>
				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
					aria-label="Close menu"
				>
					<X size={24} />
				</button>
			</div>

			<nav className="flex-1 p-4 overflow-y-auto">
				{orderedRoutes.map((value) => (
					<Link
						key={value.path}
						to={value.path}
						onClick={() => setIsOpen(false)}
						tabIndex={isOpen ? 0 : -1}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
						}}
					>
						{<value.icon size={20} />}
						<span className="font-medium">{value.name}</span>
			</Link>
				))}

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
	);
}

function HeaderNav({
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [burgerOverNavbar, setBurgerOverNavbar] = useState(false);
	const windowWidth = useWindowWidth();
	const location = useLocation();

	useEffect(() => {
		if (windowWidth >= 768) {
			setBurgerOverNavbar(false);
		} else {
			setBurgerOverNavbar(true);
		}
	}, [windowWidth]);

	return (
		<div>
			{!burgerOverNavbar && (
				<nav>
					<ul className="list-none mr-4 flex items-center gap-6">
						{orderedRoutes.map((value) => (
							<Link
								key={value.path}
								to={value.path}
								className="relative"
							>
								<motion.p
									animate={{
										color: value.path === location.pathname ? "#00b8db" : "#fff",
									}}
									whileHover={{
										color: "#00b8db"
									}}
									initial={{
										color: "#fff"
									}}
								>
									{value.name}
								</motion.p>
								{value.path === location.pathname ? (
									<>
										<motion.div
											layoutId="underline"
											id="underline"
											style={{
												position: "absolute",
												bottom: -2,
												left: 0,
												right: 0,
												height: 2,
												backgroundColor: "#00b8db"
											}}
										/>
										<motion.div
											layoutId="overline"
											id="overline"
											style={{
												position: "absolute",
												top: 1,
												left: 0,
												right: 0,
												height: 2,
												backgroundColor: "#00b8db"
											}}
										/>
									</>
								) : null}
							</Link>
						))}				
					</ul>
				</nav>
			)}

			{burgerOverNavbar && (
				<button
					type="button"
					onClick={() => setIsOpen((isOpen) => !isOpen)}
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>
			)}
		</div>
	);
}

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [ fontIndex, setFontIndex ] = useState(0);

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * paulFonts.length);
		setFontIndex(randomIndex);
	}, []);

	return (
		<>
			<header className="p-4 flex items-center bg-black text-white shadow-lg justify-between fixed top-0 left-0 right-0 sticky z-50">
				<motion.h1
					className="ml-4 text-4xl font-bold italic"
					style={{ fontFamily: paulFonts[fontIndex] }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<Link to="/">Paul</Link>
				</motion.h1>
				<HeaderNav isOpen={isOpen} setIsOpen={setIsOpen} />
			</header>
			<BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
}
