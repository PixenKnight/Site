import { useState, Dispatch, SetStateAction } from "react"
import { preload } from 'react-dom'

import {
	ChevronLeft,
	ChevronRight
} from "lucide-react"

import { motion, Easing, PanInfo } from "motion/react"

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
		duration: 0.5,
		ease: "easeInOut" as Easing
	}

	return (
		<motion.div 
			className="flex flex-row justify-center align-center items-center mb-4 relative w-full max-w-[100%]"
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
			<motion.div
				layout
				animate={{
					display: selected === 0 ? "block" : "none",
					width: selected === 0 ? "15rem" : 0,
					minWidth: selected === 0 ? "15rem" : 0,
					margin: selected === 0 ? "0 0.5rem 0 0.5rem" : "0"
				}}
				initial={{
					display: "none",
					width: 0,
					margin: 0
				}}
				transition={transitionOptions}
			/>
			{photos.map((_, i) => {
				const isSelected = selected === i
				const isLeft = selected === (i + 1)
				const isRight = selected === (i - 1)

				return <Photo
					src={photos[i]}
					alt={altTexts[i]}
					tailwindClasses="rounded-lg shadow-md h-128 object-cover p-0 select-none touch-pinch-zoom touch-pan-y"
					props={{
						key: i,
						layout: true,
						draggable: "false",
						animate: {
							opacity: isSelected ? 1 : ((isLeft || isRight) ? 0.5 : 0),
							visibility: (isSelected || isLeft || isRight) ? "visible" : "hidden",
							width: isSelected ? "auto" : ((isLeft || isRight) ? "15rem" : 0),
							margin: (isSelected || isLeft || isRight) ? "0 0.5rem 0 0.5rem" : "0",
						},
						initial: {
							opacity: 0,
							visibility: "hidden",
							width: 0,
							margin: 0,
						},
						onClick: () => {if (isSelected || isLeft || isRight) setSelected(i)},
						onPan: (e: PointerEvent, pointInfo: PanInfo) => {console.log(e); console.log(pointInfo)},
						transition: transitionOptions
					}}
				/>
			})}
			<motion.div
				layout
				animate={{
					display: selected === (photos.length - 1) ? "block" : "none",
					width: selected === (photos.length - 1) ? "15rem" : 0,
					minWidth: selected === (photos.length - 1) ? "15rem" : 0,
					margin: selected === (photos.length - 1) ? "0 0.5rem 0 0.5rem" : "0"
				}}
				initial={{
					display: "none",
					width: 0,
					margin: 0
				}}
				transition={transitionOptions}
			/>
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
		<div className="flex flex-col w-[50%] min-w-[24rem]">
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