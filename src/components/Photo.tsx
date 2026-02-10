import { AnimatePresence, type MotionProps, motion, type Variants } from "motion/react";
import {
	type DetailedHTMLProps,
	type HTMLAttributes,
	useEffect,
	useState,
} from "react";

interface PhotoProps {
	src: string;
	alt?: string;
	hoverAltEnabled?: boolean;
	tailwindClasses?:
		| string
		| { auto?: string; imgClasses?: string; divClasses?: string };
	props?:
		| (MotionProps &
				DetailedHTMLProps<
					HTMLAttributes<HTMLImageElement | HTMLDivElement>,
					HTMLImageElement | HTMLDivElement
				>)
		| {
				auto?: MotionProps &
					DetailedHTMLProps<
						HTMLAttributes<HTMLImageElement | HTMLDivElement>,
						HTMLImageElement | HTMLDivElement
					>;
				imgProps?: MotionProps &
					DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>;
				divProps?: MotionProps &
					DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
		  };
}

function filterTailwindClasses(tailwindClasses: string | undefined) {
	if (!tailwindClasses) return { imgClasses: "", divClasses: "" };

	let imgClasses = "";
	let divClasses = "";

	// Helper to remove screen size prefixes
	const removeScreenSizePrefixes = (c: string) => {
		return c.includes(":") ? c.split(":").pop() : c;
	};

	// Filter for margin/padding classes
	const mpFilter = (c: string) => {
		const clean = removeScreenSizePrefixes(c);
		if (!clean) return false;
		return (
			clean.startsWith("m-") ||
			clean.startsWith("p-") ||
			clean.startsWith("mx-") ||
			clean.startsWith("my-") ||
			clean.startsWith("mt-") ||
			clean.startsWith("mb-") ||
			clean.startsWith("ml-") ||
			clean.startsWith("mr-") ||
			clean.startsWith("px-") ||
			clean.startsWith("py-") ||
			clean.startsWith("pt-") ||
			clean.startsWith("pb-") ||
			clean.startsWith("pl-") ||
			clean.startsWith("pr-")
		);
	};

	// Filter size classes
	const sizeFilter = (c: string) => {
		const clean = removeScreenSizePrefixes(c);
		if (!clean) return false;
		return (
			clean.startsWith("w-") ||
			clean.startsWith("h-") ||
			clean.startsWith("max-w-") ||
			clean.startsWith("max-h-") ||
			clean.startsWith("min-w-") ||
			clean.startsWith("min-h-") ||
			clean.startsWith("size-")
		);
	};

	// Filter overflow classes
	const overflowFilter = (c: string) => {
		const clean = removeScreenSizePrefixes(c);
		if (!clean) return false;
		return clean.startsWith("overflow-");
	};

	imgClasses = tailwindClasses
		.split(" ")
		.filter((c) => !mpFilter(c) && !sizeFilter(c) && !overflowFilter(c))
		.join(" ");

	divClasses = tailwindClasses
		.split(" ")
		.filter((c) => mpFilter(c) || sizeFilter(c) || overflowFilter(c))
		.join(" ");

	return { imgClasses, divClasses };
}

function filterProps(
	props:
		| (MotionProps &
				DetailedHTMLProps<
					HTMLAttributes<HTMLImageElement | HTMLDivElement>,
					HTMLImageElement | HTMLDivElement
				>)
		| undefined,
) {
	if (!props) return { imgProps: {}, divProps: {} };

	const imgProps: MotionProps &
		DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> = {};
	const divProps: MotionProps &
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {};

	Object.entries(props).forEach(([key, value]) => {
		if (
			key === "animate" ||
			key === "initial" ||
			key === "whileHover" ||
			key === "whileTap" ||
			key === "whileInView" ||
			key === "viewport" ||
			key === "exit"
		) {
			// Margin and padding animations go to div
			const animateValue = value as any;
			const divMotion: any = {};
			const imgMotion: any = {};

			Object.entries(animateValue).forEach(([aKey, aValue]) => {
				if (
					aKey.startsWith("margin") ||
					aKey.startsWith("padding") ||
					aKey.startsWith("width")
				) {
					divMotion[aKey] = aValue;
				} else {
					imgMotion[aKey] = aValue;
				}
			});

			if (Object.keys(divMotion).length > 0) {
				divProps[key] = divMotion;
			}
			if (Object.keys(imgMotion).length > 0) {
				imgProps[key] = imgMotion;
			}
		} else if (key === "transition") {
			imgProps.transition = value;
			divProps.transition = value;
		} else if (key === "draggable") {
			imgProps.draggable = value;
		} else if (key !== "key") {
			divProps[key as keyof typeof divProps] = value;
		}
	});

	return { imgProps, divProps };
}

const hoverImageVariants = {
	normal: {},
	hovered: {},
};

const hoverAltTextVariants = {
	normal: { y: "100%", opacity: 0 },
	hovered: { y: "0%", opacity: 1 },
};

const closeButtonVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.3,
			duration: 0.2,
			ease: "easeInOut",
			when: "beforeChildren",
		},
	},
}

const closeButtonCrossVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (index) => {
		const delay = 0.2 * index;
		return {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
				opacity: { delay, duration: 0.01 },
			},
		}
    },
}

export default function Photo({
	src,
	alt,
	hoverAltEnabled,
	tailwindClasses,
	props,
}: PhotoProps & MotionProps) {
	const [ photoModalSelected, setPhotoModalSelected ] = useState(false);

	// Move margin and padding to motion div to avoid description text issues
	const [ imgClasses, setImgClasses ] = useState("");
	const [divClasses, setDivClasses] = useState("");

	const [imgProps, setImgProps] = useState<
		MotionProps &
			DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>
	>({});
	const [divProps, setDivProps] = useState<
		MotionProps &
			DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	>({});

	const imgRoundingStyle = imgProps?.style?.borderRadius;
	const divRoundingStyle = divProps?.style?.borderRadius;
	const unalteredRounding = imgRoundingStyle ?? divRoundingStyle ?? "";

	useEffect(() => {
		if (!tailwindClasses) return;
		if (typeof tailwindClasses === "object") {
			let imgClasses = "";
			let divClasses = "";
			if (tailwindClasses.auto) {
				const { imgClasses: autoImgClasses, divClasses: autoDivClasses } =
					filterTailwindClasses(tailwindClasses.auto);
				imgClasses = autoImgClasses;
				divClasses = autoDivClasses;
			}

			if (tailwindClasses.imgClasses) {
				// Filter existing imgClasses to remove duplicates
				// imgClasses takes precedence over auto
				const imgIndicators = tailwindClasses.imgClasses
					.split(" ")
					.flatMap((c) => c.split("-")[0]);
				if (imgIndicators.length === 0) return;
				const additionalImgClasses = imgClasses
					.split(" ")
					.filter((c) => !imgIndicators.includes(c.split("-")[0]))
					.join(" ");
				imgClasses =
					`${tailwindClasses.imgClasses} ${additionalImgClasses}`.trim();
			}

			if (tailwindClasses.divClasses) {
				// Filter existing divClasses to remove duplicates
				// divClasses takes precedence over auto
				const divIndicators = tailwindClasses.divClasses
					.split(" ")
					.flatMap((c) => c.split("-")[0]);
				if (divIndicators.length === 0) return;
				const additionalDivClasses = divClasses
					.split(" ")
					.filter((c) => !divIndicators.includes(c.split("-")[0]))
					.join(" ");
				divClasses =
					`${tailwindClasses.divClasses} ${additionalDivClasses}`.trim();
			}

			setImgClasses(imgClasses);
			setDivClasses(divClasses);

			return;
		}
		const { imgClasses, divClasses } = filterTailwindClasses(tailwindClasses);
		setImgClasses(imgClasses);
		setDivClasses(divClasses);
	}, [tailwindClasses]);

	useEffect(() => {
		if (!props) return;

		if (
			typeof props === "object" &&
			("auto" in props || "imgProps" in props || "divProps" in props)
		) {
			let newImgProps: MotionProps &
				DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> =
				{};
			let newDivProps: MotionProps &
				DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {};

			if ("auto" in props && props.auto) {
				const { imgProps: autoImgProps, divProps: autoDivProps } = filterProps(
					props.auto,
				);
				newImgProps = { ...autoImgProps };
				newDivProps = { ...autoDivProps };
			}

			if ("imgProps" in props && props.imgProps) {
				// Filter out any overlapping keys, imgProps takes precedence
				Object.entries(props.imgProps).forEach(([key, value]) => {
					newImgProps[key as keyof typeof newImgProps] = value;
				});
			}

			if ("divProps" in props && props.divProps) {
				// Filter out any overlapping keys, divProps takes precedence
				Object.entries(props.divProps).forEach(([key, value]) => {
					newDivProps[key as keyof typeof newDivProps] = value;
				});
			}

			setImgProps(newImgProps);
			setDivProps(newDivProps);
			return;
		}

		const { imgProps, divProps } = filterProps(
			props as MotionProps &
				DetailedHTMLProps<
					HTMLAttributes<HTMLImageElement | HTMLDivElement>,
					HTMLImageElement | HTMLDivElement
				>,
		);
		setImgProps(imgProps);
		setDivProps(divProps);
	}, [props]);

	return (
		<>
			<motion.div
				layout
				className={`${divClasses} relative`}
				draggable={divProps?.draggable}
				variants={hoverImageVariants}
				whileHover={hoverAltEnabled ? "hovered" : "normal"}
				onClick={() => setPhotoModalSelected(true)}
				initial="normal"
				{...divProps}
			>
				{/* Image with motion effects */}
				<motion.img
					layout
					layoutId={`photo-${src}`}
					src={src}
					alt={alt}
					title={alt}
					className={imgClasses}
					{...imgProps}
				/>

				{/* Hover alt text */}
				<div
					className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden pointer-events-none"
				>
					<motion.div
						className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 from-70% to-transparent pointer-events-auto"
						variants={hoverAltTextVariants}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						style={{ borderBottomRightRadius: unalteredRounding, borderBottomLeftRadius: unalteredRounding }}
					>
						<p className="text-white text-lg m-2 text-center select-text">
							{alt}
						</p>
					</motion.div>

					{/* Modal text for layout anim */}
					<motion.div
						layout
						layoutId={`alt-${src}`}
						className="absolute bottom-0 left-0 w-full bg-slate-900 z-0"
						style={{ 
							opacity: 0,
						}}
					>
						<p className="text-white text-lg m-2 text-center select-text">
							{alt}
						</p>
					</motion.div>

					{/* Alt: solid slate background */}
					{/* <motion.div 
						className="absolute bottom-0 left-0 w-full bg-slate-800 pointer-events-auto"
						variants={hoverAltTextVariants}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<p className="text-white text-sm text-center m-2 select-text">{alt}</p>
					</motion.div> */}
				</div>
			</motion.div>

			{/* Modal for full-size image */}
			<AnimatePresence>
				{ photoModalSelected && (
					<>
						{/* Full-screen div, background blur and dim */}
						<motion.div
							className="z-100 fixed inset-0 flex items-center justify-center"
							animate={{
								backdropFilter: photoModalSelected ? "blur(5px)" : "blur(0px)",
								backgroundColor: photoModalSelected ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
							}}
							initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)" }}
							exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)" }}
							onClick={() => setPhotoModalSelected(false)}
						>
							{/* Modal contents */}
							<motion.div
								className="flex flex-col shrink-0 items-center justify-center w-min relative"
							>
								<motion.button
									className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors z-300"
									variants={closeButtonVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									onClick={() => setPhotoModalSelected(false)}
								>
									<motion.svg width="20" height="20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
										<motion.line
											x1="20"
											y1="180"
											x2="180"
											y2="20"
											stroke="#000"
											variants={closeButtonCrossVariants}
											custom={0}
											style={{
												strokeWidth: 25,
												strokeLinecap: "round",
												fill: "transparent",
											}}
										/>
										<motion.line
											x1="20"
											y1="20"
											x2="180"
											y2="180"
											stroke="#000"
											variants={closeButtonCrossVariants}
											custom={1}
											style={{
												strokeWidth: 25,
												strokeLinecap: "round",
												fill: "transparent",
											}}
										/>
									</motion.svg>
								</motion.button>
								<motion.img
									layout
									layoutId={`photo-${src}`}
									src={src}
									alt={alt}
									title={alt}
									className="relative"
									style={{
										width: "fit-content",
										maxHeight: "75vh",
										maxWidth: "90vw",
										margin: "0",
										borderTopLeftRadius: "12px",
										borderTopRightRadius: "12px",
										zIndex: 200,
										userSelect: "none",
										msUserSelect: "none",
										WebkitUserSelect: "none",
										MozUserSelect: "none",
									}}
									draggable={false}
									onClick={(e) => e.stopPropagation()}
								/>
								<motion.div
									layout
									layoutId={`alt-${src}`}
									className="bg-slate-900 text-white text-center p-4 text-wrap w-full"
									style={{
										borderBottomLeftRadius: "12px",
										borderBottomRightRadius: "12px",
										zIndex: 50
									}}
									onClick={(e) => e.stopPropagation()}
								>
									<p className="text-xl">{alt}</p>
								</motion.div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
