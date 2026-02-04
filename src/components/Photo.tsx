import { motion } from "motion/react"

interface PhotoProps {
	src: string
	alt?: string
	tailwindClasses?: string
	props?: object
}

export default function Photo({src, alt, tailwindClasses, props}: PhotoProps) {
	return (
		<motion.img
			src={src}
			alt={alt ?? ""}
			className={tailwindClasses}
			{...props}
		/>
	)
}