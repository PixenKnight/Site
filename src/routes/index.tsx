import { createFileRoute, Link } from '@tanstack/react-router'
import {
	Server,
	Route as RouteIcon,
	Sparkles,
	MessageCircle,
	Computer,
	SquareTerminal,
	CircuitBoard
} from 'lucide-react'

import { motion } from 'motion/react'

export const Route = createFileRoute('/')({ component: App })

const cards = [
	{
		icon: <Computer className="w-12 h-12 text-cyan-400" />,
		title: 'Tech Enthusiast',
		description:
			'Anything tech-related catches my interest, from this website running on my Raspberry Pi to my "Trash Can" Mac Pro. I love exploring all technologies and integrating them into my projects.',
	},
	{
		icon: <Server className="w-12 h-12 text-cyan-400" />,
		title: 'Backend Expertise',
		description:
			'Skilled in building robust backend systems using Node.js, Express, and databases like MongoDB, Redis, and MySQL (and other SQL RDBs). I ensure seamless data flow and efficient server-side operations for my applications.',
	},
	{
		icon: <RouteIcon className="w-12 h-12 text-cyan-400" />,
		title: 'Frontend Aficionado',
		description:
			'I may not have the best eye for design, but I am great at implementing a vision using React, Tailwind CSS, and modern frontend tools to create responsive and user-friendly interfaces (this site runs on TanStack Router and Vite!).',
	},
	{
		icon: <SquareTerminal className="w-12 h-12 text-cyan-400" />,
		title: 'Multilingual Developer',
		description:
			'Fluent in multiple programming languages and frameworks, enabling me to build applications that are both performant and maintainable. From Python to Java, from bare React to Expo, I adapt quickly to project needs.',
	},
	{
		icon: <CircuitBoard className="w-12 h-12 text-cyan-400" />,
		title: 'Low-level Programming',
		description:
			'Although tedious, I find RISC-V Assembly anc C programming fascinating. Understanding low-level programming enhances my overall coding skills and allows me to optimize performance-critical applications.',
	},
	{
		icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
		title: 'AI-Powered Solutions',
		description:
			'Graduated with a concentration in Artificial Intelligence, I leverage AI and machine learning techniques to enhance and develop intelligent applications that solve complex problems.',
	},
]

function Card({ icon, title, description }: {
	icon: React.ReactNode
	title: string
	description: string
}) {
	return (
		<motion.div
			className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-colors hover:shadow-lg hover:shadow-cyan-500/10 opacity-0"
			whileInView={{ opacity: 1}}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			viewport={{ amount: 0.5 }}
		>
			<div className="mb-4">{icon}</div>
			<h3 className="text-xl font-semibold text-white mb-3">
				{title}
			</h3>
			<p className="text-gray-400 leading-relaxed">
				{description}
			</p>
		</motion.div>
	)
}

function App() {
	return (
		<div className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900">
			<section className="relative py-20 px-6 text-center overflow-hidden h-[calc(100vh-72px)] flex flex-col justify-center">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-slow-pulse"></div>
				<div className="relative flex flex-col items-center max-w-5xl mx-auto">
					<motion.div
						className="flex items-center justify-center gap-6 mb-6 w-fit"
						animate={{ 
							opacity: 1,
							y: 0,
							transition: { duration: 0.5, ease: 'easeOut' }
						}}
						initial={{ opacity: 0, y: 20 }}
						whileHover={{
							scale: 1.05,
						}}
						whileTap={{ scale: 0.95 }}
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 15
						}}>
						<h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.02em]">
							<span className="text-gray-300">HI! I'M</span>{' '}
							<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
								PAUL
							</span>
						</h1>
					</motion.div>
					<p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
						I'm a full-stack developer who loves building robust, scalable infrastructure
					</p>
					<p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
						Welcome to my personal website!
					</p>
					<div className="flex flex-col items-center gap-4">
						<Link
								to="/contact"
								className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 mb-2 text-white border-cyan-400 border-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 motion-safe:hover:scale-103"
						>
								<MessageCircle size={24} />
								<span className="font-bold">Contact</span>
					</Link>
					</div>
				</div>
				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
					<motion.span className="text-gray-200 flex flex-col items-center" animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}>
						<p className="mb-[-0.5rem]">Scroll Down</p>
						<p>&#x2304;</p>
					</motion.span>
				</div>
			</section>

			<section className="py-16 px-6 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.map((feature, index) => (
						<Card
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</div>
			</section>
		</div>
	)
}
