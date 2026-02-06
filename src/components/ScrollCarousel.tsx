import { motion, MotionValue, useMotionValue, useMotionValueEvent, animate, useScroll, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

import {
	ChevronLeft,
	ChevronRight
} from "lucide-react"

import Photo from "./Photo";

function Dots({ count, selected, setSelected, setUserScrolling }: {
	count: number,
	selected: number,
	setSelected: React.Dispatch<React.SetStateAction<number>>,
	setUserScrolling: () => void
}) {
	return (
		<div className="flex flex-row gap-1 h-fit">
			{Array.from({ length: count }).map((_, i) => {
				return (
					<motion.div
						key={i}
						className="w-4 h-4 border-2 rounded-full"
						animate={{
							backgroundColor: selected === i ? "#99a1af" : "rgba(0,0,0,0)",
						}}
						whileHover={{
							borderColor: "#ffffff",
							cursor: "pointer",
							transition: { delay: 0, duration: 0.2 }
						}}
						initial={{
							borderColor: "#99a1af"
						}}
						transition={{ delay: 0.2, duration: 0.2 }}
						onClick={() => {
							setUserScrolling();
							setSelected(i);
						}}
					/>
				)
			})}
		</div>
	)
}

const left = `0%`
const right = `100%`
const leftInset = `10%`
const rightInset = `90%`
const transparent = `#0000`
const opaque = `#000`
function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
		const prev = scrollXProgress.getPrevious()

        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            (prev && prev <= 0.05) ||
            (prev && prev >= 0.95)
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

function CarouselLi({ photo, altText, refList, viewList, index, selected }: { 
	photo: string,
	altText: string,
	refList: React.RefObject<(HTMLLIElement | null)[]>,
	viewList: React.RefObject<(boolean | null)[]>,
	index: number,
	selected: number
}) {
	const ref = useRef<HTMLLIElement>(null)
	const isInView = useInView(ref, { amount: 0.9 })

	useEffect(() => {
		refList.current[index] = ref.current
	}, [index, refList]);

	useEffect(() => {
		viewList.current[index] = isInView
	}, [isInView, index, viewList])

	return (
		<motion.li 
			className="flex inline-block flex-shrink-0 flex-grow-0 snap-center"
			ref={ref}
		>
			<Photo
				src={photo}
				alt={altText}
				hoverAltEnabled
				tailwindClasses={{
					imgClasses: "rounded-lg h-100 w-auto outline-2 outline-offset-4 select-none",
					divClasses: "mx-4"
				}}
				props={{
					imgProps: {
						animate: {
							outlineColor: selected === index ? "rgba(0, 184, 219, 1)" : "rgba(0, 184, 219, 0)"
						},
						initial: {
							outlineColor: "transparent"
						},
						draggable: false,
					}
				}}
			/>
		</motion.li>
	)
}


export default function ScrollCarousel({ photos, altTexts }: { photos: string[], altTexts: string[] }) {
	const ulRef = useRef<HTMLUListElement>(null)
	const { scrollXProgress } = useScroll({ container: ulRef })
	const maskImage = useScrollOverflowMask(scrollXProgress)

	const [ selected, setSelected ] = useState(0)
	const liRefs = useRef<(HTMLLIElement | null)[]>([]);
	const liViewRefs = useRef<(boolean | null)[]>([]);

	const isUserScrolling = useRef(false);
	const scrollTimeout = useRef<number | null>(null);

	const setUserScrolling = () => {
		isUserScrolling.current = true
		if (scrollTimeout.current) {
			window.clearTimeout(scrollTimeout.current)
		}
		scrollTimeout.current = window.setTimeout(() => {
			isUserScrolling.current = false
			scrollTimeout.current = null
		}, 100)
	}

	useEffect(() => {
		const curr = liRefs.current[selected]
		if (!curr || !isUserScrolling.current) return;
		curr?.scrollIntoView({ behavior: "smooth", inline: "center" })
	}, [selected])

	useEffect (() => {
		const ul = ulRef.current
		if (!ul) return;

		ul.addEventListener("wheel", (e) => {
			e.preventDefault()

			setUserScrolling()

			const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? Math.sign(e.deltaY) : Math.sign(e.deltaX)
			setSelected(prev => Math.max(0, Math.min(prev + delta, photos.length - 1)))
		})

		ul.scrollTo({ left: 0, behavior: "smooth" })
	}, [])

	useMotionValueEvent(scrollXProgress, "change", () => {
		if (!isUserScrolling.current) {
			const inViewIndex = liViewRefs.current.findIndex(inView => inView === true)
			if (inViewIndex !== -1 && inViewIndex !== selected) {
				setSelected(inViewIndex)
			}
		} else if (scrollTimeout.current) {
			window.clearTimeout(scrollTimeout.current)
			scrollTimeout.current = window.setTimeout(() => {
				isUserScrolling.current = false
				scrollTimeout.current = null
			}, 100)
		}
	})

	return (
		<div className="relative w-full md:max-w-[50%] not-md:max-w-[90%] flex flex-col">
			<motion.ul style={{ maskImage }} ref={ulRef} className="flex list-none overflow-x-auto flex-shrink-0 flex-grow-0 pb-6 mb-1 pt-6 snap-x snap-mandatory max-h-128 snap-normal">
				{photos.map((photo, i) => {
					return (
						<CarouselLi
							key={i}
							photo={photo}
							altText={altTexts[i]}
							refList={liRefs}
							viewList={liViewRefs}
							index={i}
							selected={selected}
						/>
					)
				})}
			</motion.ul>
			<div className="flex flex-row justify-between items-center">
				<div className="flex gap-2">
					<motion.button
						className="hover:cursor-pointer border-2 rounded-full"
						whileHover={{ backgroundColor: "rgba(229, 231, 235, 1)", color: "rgb(29, 41, 61)" }}
						initial={{ backgroundColor: "rgba(229, 231, 235, 0)", color: "rgb(229, 231, 235)" }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={() => {
							setSelected(prev => {
								const newSelected = Math.max(prev - 1, 0);
								setUserScrolling();
								return newSelected;
							});
						}}
					>
						<ChevronLeft size={24} className="pr-[0.1rem]"/>
					</motion.button>
					<motion.button
						className="hover:cursor-pointer border-2 rounded-full"
						whileHover={{ backgroundColor: "rgba(229, 231, 235, 1)", color: "rgb(29, 41, 61)" }}
						initial={{ backgroundColor: "rgba(229, 231, 235, 0)", color: "rgb(229, 231, 235)" }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={() => {
							setSelected(prev => {
								const newSelected = Math.min(prev + 1, photos.length - 1);
								setUserScrolling();
								return newSelected;
							});
						}}
					>
						<ChevronRight size={24} className="pl-[0.1rem]"/>
					</motion.button>
				</div>
				<Dots count={photos.length} selected={selected} setSelected={setSelected} setUserScrolling={setUserScrolling}/>
			</div>
		</div>
	)
}