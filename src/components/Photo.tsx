import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react"
import { motion, MotionProps } from "motion/react"


interface PhotoProps {
	src: string
	alt?: string
	tailwindClasses?: string | { auto?: string, imgClasses?: string, divClasses?: string }
	props?: MotionProps & DetailedHTMLProps<HTMLAttributes<any>, any> | { 
		auto?: MotionProps & DetailedHTMLProps<HTMLAttributes<any>, any>, 
		imgProps?: MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>,
		divProps?: MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

function filterTailwindClasses(tailwindClasses: string | undefined) {
	if (!tailwindClasses) return { imgClasses: "", divClasses: "" }

	let imgClasses = ""
	let divClasses = ""

	// Helper to remove screen size prefixes
	const removeScreenSizePrefixes = (c: string) => {
		return c.includes(":") ? c.split(":").pop() : c
	}

	// Filter for margin/padding classes
	const mpFilter = (c: string) => {
		const clean = removeScreenSizePrefixes(c)
		if (!clean) return false
		return clean.startsWith("m-") || clean.startsWith("p-") || clean.startsWith("mx-") || clean.startsWith("my-") || clean.startsWith("mt-") || clean.startsWith("mb-") || clean.startsWith("ml-") || clean.startsWith("mr-") || clean.startsWith("px-") || clean.startsWith("py-") || clean.startsWith("pt-") || clean.startsWith("pb-") || clean.startsWith("pl-") || clean.startsWith("pr-")
	}

	// Filter size classes
	const sizeFilter = (c: string) => {
		const clean = removeScreenSizePrefixes(c)
		if (!clean) return false
		return clean.startsWith("w-") || clean.startsWith("h-") || clean.startsWith("max-w-") || clean.startsWith("max-h-") || clean.startsWith("min-w-") || clean.startsWith("min-h-") || clean.startsWith("size-")
	}

	// Filter overflow classes
	const overflowFilter = (c: string) => {
		const clean = removeScreenSizePrefixes(c)
		if (!clean) return false
		return clean.startsWith("overflow-")
	}

	imgClasses = tailwindClasses
		.split(" ")
		.filter(c => !mpFilter(c) && !sizeFilter(c) && !overflowFilter(c))
		.join(" ")
	
	divClasses = tailwindClasses
		.split(" ")
		.filter(c => mpFilter(c) || sizeFilter(c) || overflowFilter(c))
		.join(" ")
	
	return { imgClasses, divClasses }
}

// Need to separate 'key' from other props because React doesn't like it when it's spread into the element props
function filterProps(props: MotionProps & DetailedHTMLProps<HTMLAttributes<any>, any> | undefined) {
	if (!props) return { imgProps: {}, divProps: {} }

	const imgProps: MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> = {}
	const divProps: MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}

	Object.entries(props).forEach(([key, value]) => {
		if (key === "animate" || key === "initial" || key === "whileHover" || key === "whileTap" || key === "whileInView" || key === "viewport" || key === "exit") {
			// Margin and padding animations go to div
			const animateValue = value as any
			const divMotion: any = {}
			const imgMotion: any = {}

			Object.entries(animateValue).forEach(([aKey, aValue]) => {
				if (aKey.startsWith("margin") || aKey.startsWith("padding") || aKey.startsWith("width")) {
					divMotion[aKey] = aValue
				} else {
					imgMotion[aKey] = aValue
				}
			})

			if (Object.keys(divMotion).length > 0) {
				divProps[key] = divMotion
			}
			if (Object.keys(imgMotion).length > 0) {
				imgProps[key] = imgMotion
			}
		} else if (key === "transition") {
			imgProps.transition = value
			divProps.transition = value
		} else if (key === "draggable") {
			imgProps.draggable = value
		} else if (key !== "key") {
			divProps[key as keyof typeof divProps] = value
		}
	});

	return { imgProps, divProps }
}

export default function Photo({src, alt, tailwindClasses, props}: PhotoProps & MotionProps) {
	// Move margin and padding to motion div to avoid description text issues
	const [ imgClasses, setImgClasses ] = useState("")
	const [ divClasses, setDivClasses ] = useState("")

	const [ imgProps, setImgProps ] = useState<MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>>({})
	const [ divProps, setDivProps ] = useState<MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>({})

	useEffect(() => {
		if (!tailwindClasses) return
		if (typeof tailwindClasses === "object") {
			let imgClasses = ""
			let divClasses = ""
			if (tailwindClasses.auto) {
				const { imgClasses: autoImgClasses, divClasses: autoDivClasses } = filterTailwindClasses(tailwindClasses.auto)
				imgClasses = autoImgClasses
				divClasses = autoDivClasses
			}

			if (tailwindClasses.imgClasses) {
				// Filter existing imgClasses to remove duplicates
				// imgClasses takes precedence over auto
				let imgIndicators = tailwindClasses.imgClasses.split(" ").flatMap(c => c.split("-")[0])
				if (imgIndicators.length === 0) return;
				const additionalImgClasses = imgClasses
					.split(" ")
					.filter(c => !imgIndicators.includes(c.split("-")[0]))
					.join(" ")
				imgClasses = `${tailwindClasses.imgClasses} ${additionalImgClasses}`.trim()
			}

			if (tailwindClasses.divClasses) {
				// Filter existing divClasses to remove duplicates
				// divClasses takes precedence over auto
				let divIndicators = tailwindClasses.divClasses.split(" ").flatMap(c => c.split("-")[0])
				if (divIndicators.length === 0) return;
				const additionalDivClasses = divClasses
					.split(" ")
					.filter(c => !divIndicators.includes(c.split("-")[0]))
					.join(" ")
				divClasses = `${tailwindClasses.divClasses} ${additionalDivClasses}`.trim()
			}

			setImgClasses(imgClasses)
			setDivClasses(divClasses)
			return
		}
		const { imgClasses, divClasses } = filterTailwindClasses(tailwindClasses)
		setImgClasses(imgClasses)
		setDivClasses(divClasses)
	}, [tailwindClasses])

	useEffect(() => {
		if (!props) return

		if (typeof props === "object" && ("auto" in props || "imgProps" in props || "divProps" in props)) {
			let newImgProps: MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> = {}
			let newDivProps: MotionProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}

			if ("auto" in props && props.auto) {
				const { imgProps: autoImgProps, divProps: autoDivProps } = filterProps(props.auto)
				newImgProps = { ...autoImgProps }
				newDivProps = { ...autoDivProps }
			}

			if ("imgProps" in props && props.imgProps) {
				// Filter out any overlapping keys, imgProps takes precedence
				Object.entries(props.imgProps).forEach(([key, value]) => {
					newImgProps[key as keyof typeof newImgProps] = value
				})
			}

			if ("divProps" in props && props.divProps) {
				// Filter out any overlapping keys, divProps takes precedence
				Object.entries(props.divProps).forEach(([key, value]) => {
					newDivProps[key as keyof typeof newDivProps] = value
				})
			}

			setImgProps(newImgProps)
			setDivProps(newDivProps)
			return
		}

		const { imgProps, divProps } = filterProps(props as MotionProps & DetailedHTMLProps<HTMLAttributes<any>, any>)
		setImgProps(imgProps)
		setDivProps(divProps)
	}, [props])

	return (
		<motion.div
			layout
			className={divClasses}
			draggable={divProps?.draggable}
			{...divProps}
		>
			{/* Image with motion effects */}
			<motion.img
				src={src}
				alt={alt ?? ""}
				className={imgClasses}
				{...imgProps}
			/>
		</motion.div>
	)
}