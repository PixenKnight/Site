import { motion } from 'motion/react'
import { useState } from 'react'

export type ToggleProps = {
	ref?: React.Ref<HTMLDivElement>
	leftColor: string
	rightColor: string
	ballColor: string
	startRight: boolean
}

const toggleWidth = 90
const toggleHeight = 40
const ballSize = 36
const ballMargin = (toggleHeight - ballSize) / 2
const ballLeftPosition = ballMargin
const ballRightPosition = toggleWidth - ballSize - ballMargin

export default function Toggle(props: ToggleProps) {
	const [ isRight, setIsRight ] = useState(props.startRight)

	const toggleVariants = {
		left: {
			backgroundColor: props.leftColor
		},
		right: {
			backgroundColor: props.rightColor
		}
	}

	const ballVariants = {
		left: {
			x: ballLeftPosition,
		},
		right: {
			x: ballRightPosition,
		}
	}

	return (
		<motion.div
			ref={props.ref}
			className={`relative flex flex-row w-[${toggleWidth}px] h-[${toggleHeight}px] rounded-full cursor-pointer`}
			variants={toggleVariants}
			animate={isRight ? "right" : "left"}
			initial={props.startRight ? "right" : "left"}
			transition={{ duration: 0.5, ease: 'easeOut'}}
			onClick={() => setIsRight(prev => !prev)}
		>
			<motion.div
				className={`w-[${ballSize}px] h-[${ballSize}px] rounded-full absolute top-[2px] left-[2px] bg-[${props.ballColor}]`}
				variants={ballVariants}
				animate={isRight ? "right" : "left"}
				initial={props.startRight ? "left" : "right"}
				transition={{ duration: 0.5, ease: 'easeOut'}}
			/>
		</motion.div>
	)
}
