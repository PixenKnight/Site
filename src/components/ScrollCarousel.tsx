import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	animate,
	type MotionValue,
	motion,
	useInView,
	useMotionValue,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import Photo from "./Photo";

function Dots({
	selected,
	setSelected,
	setUserScrolling,
	photos,
}: {
	selected: number;
	setSelected: React.Dispatch<React.SetStateAction<number>>;
	setUserScrolling: () => void;
	photos: string[];
}) {
	return (
		<div className="flex flex-row gap-1 h-fit">
			{photos.map((val, i) => {
				return (
					<motion.div
						key={`${val}-dot`}
						className="w-4 h-4 border-2 rounded-full"
						animate={{
							backgroundColor: selected === i ? "#99a1af" : "rgba(0,0,0,0)",
						}}
						whileHover={{
							borderColor: "#ffffff",
							cursor: "pointer",
							transition: { delay: 0, duration: 0.2 },
						}}
						initial={{
							borderColor: "#99a1af",
						}}
						transition={{ delay: 0.2, duration: 0.2 }}
						onClick={() => {
							setUserScrolling();
							setSelected(i);
						}}
					/>
				);
			})}
		</div>
	);
}

function scrollOverflowMask(
	scrollXProgress: MotionValue<number>,
	selectedOverride?: number,
	selectedMax?: number,
) {
	const left = `0%`;
	const right = `100%`;
	const leftInset = `10%`;
	const rightInset = `90%`;
	const transparent = `#0000`;
	const opaque = `#000`;

	const maskImage = useMotionValue(
		`linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`,
	);

	useMotionValueEvent(scrollXProgress, "change", (value) => {
		const prev = scrollXProgress.getPrevious();

		if (
			value === 0 ||
			(selectedOverride !== undefined && selectedOverride === 0)
		) {
			animate(
				maskImage,
				`linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`,
			);
		} else if (
			value === 1 ||
			(selectedOverride !== undefined && selectedOverride === selectedMax)
		) {
			animate(
				maskImage,
				`linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`,
			);
		} else if ((prev && prev <= 0.05) || (prev && prev >= 0.95)) {
			animate(
				maskImage,
				`linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`,
			);
		}
	});

	return maskImage;
}

/**
 * Helper component for {@link ScrollCarousel}.
 * Renders each photo and alt text, and sets up refs and inView state for each photo to be used by ScrollCarousel.
 *
 * @param props.photo URL to a photo to be rendered. Relative to base URL.
 * @param props.altText Alt text for the photo, to be shown on hover and used for accessibility.
 * @param props.refList List of refs to be used for tracking by the parent `ScrollCarousel` component.
 * @returns
 */
function CarouselLi(props: {
	photo: string;
	altText: string;
	refList: React.RefObject<(HTMLLIElement | null)[]>;
	viewList: React.RefObject<(boolean | null)[]>;
	index: number;
	selected: number;
}) {
	const ref = useRef<HTMLLIElement>(null);
	const isInView = useInView(ref, { amount: 0.9 });

	useEffect(() => {
		props.refList.current[props.index] = ref.current;
	}, [props.index, props.refList]);

	useEffect(() => {
		props.viewList.current[props.index] = isInView;
	}, [isInView, props.index, props.viewList]);

	return (
		<motion.li
			className="flex flex-shrink-0 flex-grow-0 snap-center items-center"
			ref={ref}
		>
			<Photo
				src={props.photo}
				alt={props.altText}
				hoverAltEnabled
				tailwindClasses={{
					imgClasses:
						"rounded-lg md:h-100 outline-2 outline-offset-4 select-none not-md:max-w-70",
					divClasses: "mx-4",
				}}
				props={{
					imgProps: {
						animate: {
							outlineColor:
								props.selected === props.index
									? "rgba(0, 184, 219, 1)"
									: "rgba(0, 184, 219, 0)",
						},
						initial: {
							outlineColor: "transparent",
						},
						draggable: false,
					},
				}}
			/>
		</motion.li>
	);
}

/**
 * Simple photo carousel component.
 * Buttons for left and right scrolling, as well as clickable indicator dots for each image and the currently selected image.
 * Also allows manual scrolling through the scrollbar, touch controls, or mouse wheel.
 *
 * See also:
 * - {@link CarouselLi}: Inner component that renders each photo for the carousel. Uses {@link Photo}.
 * - {@link Dots}: Inner component that renders the indicator dots.
 * - {@link scrollOverflowMask}: Helper function that masks the edges of the carousel with a linear gradient.
 * - {@link Photo}: Component used to render each photo in {@link CarouselLi}.
 *
 * @param {string[]} props.photos Array of photo URLs to display in the carousel. Relative to base site URL.
 * @param {string[]} props.altTexts Array of alt texts for each photo, in the same order as the photos. One-to-one correspondence with `props.photos`.
 * @returns
 */
export default function ScrollCarousel(props: {
	photos: string[];
	altTexts: string[];
}) {
	const [selected, setSelected] = useState(0);

	const ulRef = useRef<HTMLUListElement>(null);
	const { scrollXProgress } = useScroll({ container: ulRef });
	const maskImage = scrollOverflowMask(
		scrollXProgress,
		selected,
		props.photos.length - 1,
	);

	const liRefs = useRef<(HTMLLIElement | null)[]>([]);
	const liViewRefs = useRef<(boolean | null)[]>([]);

	const isUserDiscreteScrolling = useRef(false);
	const discreteScrollTimeout = useRef<number | null>(null);

	// Helper function to set isUserDiscreteScrolling to true for 200 ms after a discrete scroll (i.e. through the buttons or a scroll wheel)
	const setUserDiscreteScrolling = useCallback(() => {
		isUserDiscreteScrolling.current = true;

		// Clear old timeout
		if (discreteScrollTimeout.current) {
			window.clearTimeout(discreteScrollTimeout.current);
		}

		// Set new timeout, clears itself
		discreteScrollTimeout.current = window.setTimeout(() => {
			isUserDiscreteScrolling.current = false;
			discreteScrollTimeout.current = null;
		}, 200);
	}, []);

	// useEffect to scroll to whatever element is selected if the user is scrolling with a wheel or moving the carousel through the buttons
	// Does not trigger if the carousel is being moved with the scrollbar or through touch controls
	useEffect(() => {
		// Only trigger move if moving in discrete steps (i.e. through the buttons or a scroll wheel)
		// Don't trigger if using smooth steps (i.e. through the scrollbar or touch controls)
		const curr = liRefs.current[selected];
		if (!curr || !isUserDiscreteScrolling.current) return;

		// Smooth-scroll to whatever element is selected
		curr?.scrollIntoView({ behavior: "smooth", inline: "center" });
	}, [selected]);

	// useEffect to set up event listener for mouse wheels to scroll smoothly
	// This way we can set a single scroll to be a scroll to the next/previous element, instead of it only scrolling once due to snap rules
	useEffect(() => {
		// Ensure carousel list has been initialized
		const ul = ulRef.current;
		if (!ul) return;

		// Event listener to specifically handle mouse wheel
		ul.addEventListener(
			"wheel",
			(e) => {
				// Since the carousel scrolls horizontally, only allow shift scrolling
				if (!e.shiftKey) return;

				// Stop default scroll behavior
				e.preventDefault();

				// User scrolling effect will handle smooth scroll to the next/previous element
				setUserDiscreteScrolling();

				// Auto-scroll to next/previous element, depending on direction of scroll
				const delta = Math.sign(e.deltaY);
				setSelected((prev) =>
					Math.max(0, Math.min(prev + delta, props.photos.length - 1)),
				);
			},
			false,
		);

		return () => {
			// Prevent duplicate event listeners when reloading
			ul.removeEventListener("wheel", () => {}, false);
		};
	}, [props.photos.length]);

	// useEffect to handle smooth motion, be it with the scrollbar or touch controls
	useMotionValueEvent(scrollXProgress, "change", () => {
		// Check if user is currently not scrolling in discrete steps (i.e. through the scrollbar or touch controls)
		if (!isUserDiscreteScrolling.current) {
			// Select whichever element is the first one currently in view
			const inViewIndex = liViewRefs.current.indexOf(true);
			if (inViewIndex !== -1 && inViewIndex !== selected) {
				setSelected(inViewIndex);
			}
		} else if (discreteScrollTimeout.current) {
			// User is currently scrolling in discrete amounts, so prevent this event from firing until 200 ms after the scroll has ended
			// Prevents this event from firing in the middle of a discrete scroll, leading to odd bounces
			window.clearTimeout(discreteScrollTimeout.current);
			discreteScrollTimeout.current = window.setTimeout(() => {
				isUserDiscreteScrolling.current = false;
				discreteScrollTimeout.current = null;
			}, 200);
		}
	});

	return (
		<div className="relative w-full max-w-full flex flex-col">
			<motion.ul
				style={{ maskImage }}
				ref={ulRef}
				className="flex list-none overflow-x-auto flex-shrink-0 flex-grow-0 pb-6 mb-1 pt-6 snap-x snap-mandatory max-h-128 snap-normal"
			>
				{props.photos.map((photo, i) => {
					return (
						<CarouselLi
							key={`${photo}-li`}
							photo={photo}
							altText={props.altTexts[i]}
							refList={liRefs}
							viewList={liViewRefs}
							index={i}
							selected={selected}
						/>
					);
				})}
			</motion.ul>
			<div className="flex flex-row justify-between items-center">
				<div className="flex gap-2">
					<motion.button
						className="hover:cursor-pointer border-2 rounded-full"
						whileHover={{
							backgroundColor: "rgba(229, 231, 235, 1)",
							color: "rgb(29, 41, 61)",
						}}
						initial={{
							backgroundColor: "rgba(229, 231, 235, 0)",
							color: "rgb(229, 231, 235)",
						}}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={() => {
							setSelected((prev) => {
								const newSelected = Math.max(prev - 1, 0);
								setUserDiscreteScrolling();
								return newSelected;
							});
						}}
					>
						<ChevronLeft size={24} className="pr-[0.1rem]" />
					</motion.button>
					<motion.button
						className="hover:cursor-pointer border-2 rounded-full"
						whileHover={{
							backgroundColor: "rgba(229, 231, 235, 1)",
							color: "rgb(29, 41, 61)",
						}}
						initial={{
							backgroundColor: "rgba(229, 231, 235, 0)",
							color: "rgb(229, 231, 235)",
						}}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={() => {
							setSelected((prev) => {
								const newSelected = Math.min(prev + 1, props.photos.length - 1);
								setUserDiscreteScrolling();
								return newSelected;
							});
						}}
					>
						<ChevronRight size={24} className="pl-[0.1rem]" />
					</motion.button>
				</div>
				<Dots
					selected={selected}
					setSelected={setSelected}
					setUserScrolling={setUserDiscreteScrolling}
					photos={props.photos}
				/>
			</div>
		</div>
	);
}
