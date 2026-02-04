import { useState, Dispatch, SetStateAction } from "react"
import { preload } from 'react-dom'

import {
	ChevronLeft,
	ChevronRight
} from "lucide-react"

import { motion, Easing } from "motion/react"

import Photo from "./Photo"

function Dots({ count, selected, setSelected }: {
	count: number,
	selected: number,
	setSelected: Dispatch<SetStateAction<number>>
}) {
	return (
		<div className="flex flex-row gap-1 h-fit">
			{Array.from({ length: count }).map((_, i) => {
				const isSelected = selected === i

				return (
					<motion.div
						key={i}
						className="w-4 h-4 border-gray-400 border-2 rounded-full"
						onClick={() => setSelected(i)}
						animate={{
							backgroundColor: isSelected ? "#99a1af" : "rgba(0,0,0,0)",
						}}
						whileHover={{
							backgroundColor: "#99a1af",
							cursor: "pointer",
						}}
						transition={{ duration: 0.2 }}
					/>
				)
			})}
		</div>
	)
}

function Cards({ photos, altTexts, selected, setSelected }: {
	photos: string[],
	altTexts: string[],
	selected: number,
	setSelected: Dispatch<SetStateAction<number>>,
}) {
	const transitionOptions = {
		duration: 10,
		ease: "easeInOut" as Easing
	}

	return (
		<motion.div 
			className="flex flex-row justify-center align-center items-center mb-4 relative w-full max-w-[100%] max-h-128"
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.05}
			onDragEnd={(_, info) => {
				if (info.offset.x > 80 && selected > 0) {
					setSelected(selected - 1)
				} else if (info.offset.x < -80 && selected < photos.length - 1) {
					setSelected(selected + 1)
				}
			}}
		>
			{photos.map((_, i) => {
				const isSelected = selected === i
				const isLeft = selected === (i + 1)
				const isRight = selected === (i - 1)

				return <Photo
					key={i}
					src={photos[i]}
					alt={altTexts[i]}
					layout
					tailwindClasses={{
						auto: "rounded-lg shadow-md object-cover select-none touch-pinch-zoom touch-pan-y",
						imgClasses: "h-100",
						divClasses: "w-max min-w-0 max-w-fit"
					}}
					props={{
						divProps: {
							animate: {
								display: (isSelected || isLeft || isRight) ? "block" : "none",
								margin: (isSelected ? ((i !== 0 && i !== photos.length - 1) ? "0rem 1rem 0rem 1rem" : (i === 0 ? "0rem 1rem 0rem 0rem" : "0rem 0rem 0rem 1rem")) : "0rem 0rem 0rem 0rem"),
								flexShrink: isSelected ? 0 : 1,
							},
							initial: {
								display: "none",
								margin: "0rem 0rem",
								flexShrink: 1,
							},
							onClick: () => {if (isSelected || isLeft || isRight) setSelected(i)},
							transition: transitionOptions
						},
						imgProps: {
							draggable: "false",
							animate: {
								opacity: isSelected ? 1 : ((isLeft || isRight) ? 0.5 : 0),
								width: isSelected ? "auto" : (isLeft || isRight ? "100px" : "0px"),
							},
							initial: {
								opacity: 0,
								width: 0,
							},
							transition: transitionOptions
						}
					}}
				/>
			})}
		</motion.div>
	)
}

export default function PhotoCarousel({ photos, altTexts }: { photos: string[], altTexts: string[] }) {
	const [ selected, setSelected ] = useState(0);

	for (let i = 0; i < photos.length; i++) {
		preload(photos[i], {
			as: "image"
		})
	}

	return (
		<div className="flex flex-col md:w-[60%] w-[95%]">
			<Cards
				photos={photos}
				altTexts={altTexts}
				selected={selected}
				setSelected={setSelected}
			/>
			<div className="flex flex-row justify-between items-center">
				<div className="flex gap-2">
					<motion.button
						className="hover:cursor-pointer border-2 rounded-full"
						whileHover={{ backgroundColor: "rgba(229, 231, 235, 1)", color: "rgb(29, 41, 61)" }}
						initial={{ backgroundColor: "rgba(229, 231, 235, 0)", color: "rgb(229, 231, 235)" }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={() => setSelected(prev => ((photos.length + prev - 1) % photos.length))}
					>
						<ChevronLeft size={24} className="pr-[0.1rem]"/>
					</motion.button>
					<motion.button
						className="hover:cursor-pointer border-2 rounded-full"
						whileHover={{ backgroundColor: "rgba(229, 231, 235, 1)", color: "rgb(29, 41, 61)" }}
						initial={{ backgroundColor: "rgba(229, 231, 235, 0)", color: "rgb(229, 231, 235)" }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={() => setSelected(prev => ((prev + 1) % photos.length))}
					>
						<ChevronRight size={24} className="pl-[0.1rem]"/>
					</motion.button>
				</div>
				<Dots count={photos.length} selected={selected} setSelected={setSelected}/>
			</div>
		</div>
	)
}