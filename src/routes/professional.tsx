import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size"

import Photo from "../components/Photo"

export const Route = createFileRoute("/professional")({
	component: RouteComponent,
});

const pageVariants = {
	initial: {},
	visible: {},
};

const sectionVariants = {
	initial: { opacity: 0 },
	visible: (sectionIndex: number) => {
		const delay = 0.5 * sectionIndex + 0.1;
		return {
			opacity: 1,
			transition: {
				duration: 0.5,
				delay,
			},
		};
	},
};

function RouteComponent() {
	const [photoPath, setPhotoPath] = useState("/me-photos/Me-Bus.JPEG");
	const windowWidth = useWindowWidth();

	useEffect(() => {
		if (windowWidth < 768) {
			setPhotoPath("/me-photos/Me-Bus-Square.JPEG");
		} else {
			setPhotoPath("/me-photos/Me-Bus.JPEG");
		}
	}, [windowWidth]);

	return (
		<motion.div
			className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900"
			variants={pageVariants}
			initial="initial"
			animate="visible"
			transition={{ duration: 1, delay: 0.2 }}
		>
			<motion.section
				className="h-fit top-0 relative py-10 px-6 items-center"
				variants={sectionVariants}
				initial="initial"
				animate="visible"
				custom={0}
			>
				<div className="flex justify-center items-center gap-4 max-w-5xl mx-auto md:flex-row not-md:flex-col">
					<Photo
						src={photoPath}
						alt="Picture of me, sitting on a bus in SF."
						hoverAltEnabled
						tailwindClasses={{
							imgClasses: "md:w-6xl not-md:max-w-xs",
							divClasses:
								"md:mr-10 md:my-8 not-md:my-4 outline-2 outline-offset-4 md:rounded-2xl not-md:rounded-4xl overflow-hidden",
						}}
						props={{
							divProps: {
								animate: {
									outlineColor: ["#00b8db", "#ad46ff", "#00b8db"],
									boxShadow: [
										"0 0 20px #00b8db",
										"0 0 20px #ad46ff",
										"0 0 20px #00b8db",
									],
									transition: {
										duration: 10,
										repeat: Infinity,
									},
								},
							},
						}}
					/>
					<div>
						<h1 className="text-5xl md:text-6xl not-md:text-center font-black text-white [letter-spacing:-0.02em]">
							<span className="text-gray-300">Hello! My name is </span>{" "}
							<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
								Paul Maresquier
							</span>
						</h1>
					</div>
				</div>
			</motion.section>
		</motion.div>
	);
}
