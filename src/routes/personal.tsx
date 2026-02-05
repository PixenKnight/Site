import { useWindowWidth } from '@react-hook/window-size'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import Photo from '../components/Photo'

import {
	SquareArrowOutUpRight
} from 'lucide-react'

import PhotoCarousel from '../components/PhotoCarousel'
import ScrollCarousel from '../components/ScrollCarousel'

export const Route = createFileRoute('/personal')({
	component: RouteComponent,
})

const photos = [
	"/cat-photos/Boys-Eep.JPEG",
	"/cat-photos/Dorito-Desk.JPEG",
	"/cat-photos/Wolf-Squish.JPEG",
	"/cat-photos/Boys-Clean.JPEG",
]

const altTexts = [
	"Wolf and Dorito sleeping by my desk.",
	"Dorito sleeping on the cat bed I have on my desk.",
	"Wolf being squished by my girlfriend with a ruler.",
	"Wolf and dorito cleaning each other."
]

function RouteComponent() {
	const [ photoPath, setPhotoPath ] = useState("/Me-With-Shanti.JPEG")
	const windowWidth = useWindowWidth()

	useEffect(() => {
		if (windowWidth < 768) {
			setPhotoPath("/Me-With-Shanti-Square.JPEG")
		} else {
			setPhotoPath("/Me-With-Shanti.JPEG")
		}
	}, [windowWidth])

	return (
		<div className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900">
			<section className="h-fit top-0 relative py-10 px-6 items-center">
				<div className="flex justify-center items-center gap-4 max-w-5xl mx-auto md:flex-row not-md:flex-col">
					<Photo
						src={photoPath}
						alt="Picture of me with my girlfriend's cat Shanti"
						hoverAltEnabled
						tailwindClasses={{ 
							imgClasses: "md:rounded-xl not-md:rounded-lg outline-2 outline-offset-4 md:w-[64rem] md:h-auto",
							divClasses: "md:mr-10 md:my-8 not-md:my-4 shadow-lg not-md:max-w-xs"
						}}
						props={{
							animate: {
								outlineColor: ["#00b8db", "#ad46ff", "#00b8db"],
								boxShadow: ["0 0 20px #00b8db", "0 0 20px #ad46ff", "0 0 20px #00b8db"],
								transition: {
									duration: 10,
									repeat: Infinity
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
			</section>
			<section className="py-6 px-6 mx-auto bg-slate-900 overflow-hidden">
				<div className="flex align-center justify-center">
					<ScrollCarousel
						photos={photos}
						altTexts={altTexts}
					/>
				</div>
			</section>
		</div>
	)
}
