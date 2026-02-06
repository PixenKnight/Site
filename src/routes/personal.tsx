import { useWindowWidth } from '@react-hook/window-size'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { motion } from 'motion/react'

import Photo from '../components/Photo'
import Toggle from '../components/Toggle'

import {
	SquareArrowOutUpRight
} from 'lucide-react'

import ScrollCarousel from '../components/ScrollCarousel'

export const Route = createFileRoute('/personal')({
	component: RouteComponent,
})

const catPhotos = {
	photos: [
		"/cat-photos/Boys-Eep.JPEG",
		"/cat-photos/Dorito-Desk.JPEG",
		"/cat-photos/Wolf-Squish.JPEG",
		"/cat-photos/Boys-Clean.JPEG",
		"/cat-photos/Dorito-Floor.JPEG",
		"/cat-photos/Wolf-Computer.JPEG"
	],
	altTexts: [
		"Wolf and Dorito sleeping by my desk.",
		"Dorito sleeping on the cat bed I have on my desk.",
		"Wolf being squished by my girlfriend with a ruler.",
		"Wolf and dorito cleaning each other.",
		"Dorito looking up at me from the floor.",
		"Wolf sitting on my computer, getting warm."
	]
}

const mePhotos = {
	photos: [

	],
	altTexts: [

	]
}

const pageVariants = {
	initial: {},
	visible: {}
}

const sectionVariants = {
	initial: { opacity: 0 },
	visible: (sectionIndex: number) => {
		const delay = 0.5 * sectionIndex + 0.1
		return {
			opacity: 1,
			transition: {
				duration: 0.5,
				delay
			}
		}
	}
}

const carouselVariants = {
	visible: {
		opacity: 1,
		display: "block",
		transition: {
			duration: 0.5,
			delay: 0.5
		}
	},
	invisible: {
		opacity: 0,
		display: "none",
		transition: {
			duration: 0.5
		}
	}
}

function RouteComponent() {
	const [ photoPath, setPhotoPath ] = useState("/Me-With-Shanti.JPEG")
	const windowWidth = useWindowWidth()

	const [ carouselToggle, setCarouselToggle ] = useState(false)

	useEffect(() => {
		if (windowWidth < 768) {
			setPhotoPath("/Me-With-Shanti-Square.JPEG")
		} else {
			setPhotoPath("/Me-With-Shanti.JPEG")
		}
	}, [windowWidth])

	return (
		<motion.div 
			className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900"
			variants={pageVariants}
			initial="initial"
			animate="visible"
			transition={{ duration: 1, delay: 0.2 }}
		>
			<motion.section
				className="h-fit top-0 relative py-10 px-6 items-center"
				variants={sectionVariants}
				initial="initial"
				animate="visible"
				custom={0}
			>
				<div className="flex justify-center items-center gap-4 max-w-5xl mx-auto md:flex-row not-md:flex-col">
					<Photo
						src={photoPath}
						alt="Picture of me with my girlfriend's cat Shanti"
						hoverAltEnabled
						tailwindClasses={{ 
							imgClasses: "md:w-6xl not-md:max-w-xs",
							divClasses: "md:mr-10 md:my-8 not-md:my-4 outline-2 outline-offset-4 md:rounded-2xl not-md:rounded-4xl overflow-hidden"
						}}
						props={{
							divProps: {
								animate: {
									outlineColor: ["#00b8db", "#ad46ff", "#00b8db"],
									boxShadow: ["0 0 20px #00b8db", "0 0 20px #ad46ff", "0 0 20px #00b8db"],
									transition: {
										duration: 10,
										repeat: Infinity
									}
								}
							}
						}}
					/>					
					<div>
						<h1 className="text-5xl md:text-6xl not-md:text-center font-black text-white [letter-spacing:-0.02em]">
							<span className="text-gray-300">Hello! My name is </span>{' '}
							<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Paul Maresquier</span>
						</h1>
						<p className="text-gray-300 mt-4 text-lg">
							My pronouns are any/all (use whatever you prefer!)
						</p>
						<p className="text-gray-300 mt-4 text-lg">
							While I am originally from Mexico, I've been living in San Francisco (USA) for the last {new Date().getFullYear() - 2021} years. I currently live with my loving girlfriend and our two spiteful, beautiful cats, Wolf and Dorito (pictured below).
						</p>
						<p className="text-gray-300 mt-4 text-lg">
							In my free time I love playing video games (see <a target="_blank" rel="noopener noreferrer" href="https://steamcommunity.com/id/Pixenknight/" className="text-cyan-400 hover:underline">my Steam library<SquareArrowOutUpRight className="inline w-4 h-4 ml-1 mb-1" /></a>), spending time with my girlfriend, and doing lots of traveling around the world.
						</p>
					</div>
				</div>
			</motion.section>
			<motion.section
				className="py-6 px-6 md:px-100 mx-auto bg-slate-900 overflow-hidden"
				variants={sectionVariants}
				initial="initial"
				animate="visible"
				custom={1}
			>
				<div className="items-center flex flex-row justify-end">
					<Toggle
						leftColor="#00b8db"
						rightColor="#ad46ff"
						ballColor="#fff"
						startRight={false}
						labels={["Cats", "Me"]}
						isRight={[carouselToggle, setCarouselToggle]}
					/>
				</div>
				<motion.div
					className="flex align-center justify-center"
					variants={carouselVariants}
					animate={carouselToggle ? "invisible" : "visible"}
					initial="invisible"
				>
					<ScrollCarousel
						photos={catPhotos.photos}
						altTexts={catPhotos.altTexts}
					/>
				</motion.div>
				<motion.div
					className="flex align-center justify-center"
					variants={carouselVariants}
					animate={carouselToggle ? "visible" : "invisible"}
					initial="visible"
				>
					<ScrollCarousel
						photos={mePhotos.photos}
						altTexts={mePhotos.altTexts}
					/>
				</motion.div>
			</motion.section>
		</motion.div>
	)
}
