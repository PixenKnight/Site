import { motion, Variant } from 'motion/react'
import React, { useState } from 'react'

export type ToggleProps = {
	ref?: React.Ref<HTMLDivElement>
	leftColor: string
	rightColor: string
	labels?: [ string, string ]
	ballColor?: string
	startRight: boolean
	isRight?: [ boolean, React.Dispatch<React.SetStateAction<boolean>> ] 
}

const toggleWidth = 80
const toggleHeight = 40
const ballSize = 32
const ballMargin = (toggleHeight - ballSize) / 2
const ballLeftPosition = ballMargin
const ballRightPosition = toggleWidth - ballSize - ballMargin

const ballVariants: { [key: string]: Variant } = {
	"left": {
		x: ballLeftPosition,
	},
	"right": {
		x: ballRightPosition,
	}
}

const textVariants: { [key: string]: Variant } = {
	"invisible": {
		display: "none",
		opacity: 0,
		transition: {
			duration: 0.2
		}
	},
	"visible": {
		display: "block",
		opacity: 1,
		transition: {
			duration: 0.2,
			delay: 0.2
		}
	}
}

export default function Toggle(props: ToggleProps) {
	const [ isRight, setIsRight ] = props.isRight ?? useState(props.startRight)

	const toggleVariants: { [key: string]: Variant } = {
	"left": {
		backgroundColor: props.leftColor,
		boxShadow: "0px 0px 6px " + props.leftColor
	},
	"right": {
		backgroundColor: props.rightColor,
		boxShadow: "0px 0px 6px " + props.rightColor
	}
}

	return (
		<div
			className="flex flex-col items-center justify-center gap-2"
		>
			{props.labels && (
				<div>
				<motion.p
					className="text-sm font-bold text-white"
					variants={textVariants}
					animate={!isRight ? "visible" : "invisible"}
					initial={!props.startRight ? "visible" : "invisible"}
				>
					{props.labels[0]}
				</motion.p>

				<motion.p
					className="text-sm font-bold text-white"
					variants={textVariants}
					animate={isRight ? "visible" : "invisible"}
					initial={props.startRight ? "visible" : "invisible"}
				>
					{props.labels[1]}
				</motion.p>
				</div>
			)}

			<motion.div
			className="relative rounded-full cursor-pointer"
			style={{
				width: `${toggleWidth}px`,
				height: `${toggleHeight}px`,
			}}
			variants={toggleVariants}
			animate={isRight ? "right" : "left"}
			initial={props.startRight ? "right" : "left"}
			transition={{ duration: 0.3, ease: 'easeOut'}}
			onClick={() => setIsRight(prev => !prev)}
		>
			<motion.div
				className="absolute rounded-full"
				style={{
					width: `${ballSize}px`,
					height: `${ballSize}px`,
					marginTop: `${ballMargin}px`,
					backgroundColor: props.ballColor ?? "#fff"
				}}
				variants={ballVariants}
				animate={isRight ? "right" : "left"}
				initial={props.startRight ? "right" : "left"}
				transition={{ duration: 0.3, ease: 'easeOut'}}
			/>
		</motion.div>
		</div>
	)
}
