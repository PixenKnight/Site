import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import MediaIcons from "@/components/MediaIcons";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const mainBGOpacity = 0.7;
	const lowBGOpacity = 0.4;

	return (
		<div className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900">
			<section className="relative py-20 px-2 md:px-6 text-center overflow-hidden h-[calc(100vh-72px)] flex flex-col justify-center">
				<motion.div
					className="absolute inset-0"
					animate={{
						backgroundImage: [
							`linear-gradient(to right, rgba(0, 184, 219, ${lowBGOpacity}), rgba(43, 127, 255, ${mainBGOpacity}), rgba(173, 70, 255, ${mainBGOpacity}))`,
							`linear-gradient(to right, rgba(0, 184, 219, ${mainBGOpacity}), rgba(43, 127, 255, ${lowBGOpacity}), rgba(173, 70, 255, ${mainBGOpacity}))`,
							`linear-gradient(to right, rgba(0, 184, 219, ${mainBGOpacity}), rgba(43, 127, 255, ${mainBGOpacity}), rgba(173, 70, 255, ${lowBGOpacity}))`,
							`linear-gradient(to right, rgba(0, 184, 219, ${mainBGOpacity}), rgba(43, 127, 255, ${lowBGOpacity}), rgba(173, 70, 255, ${mainBGOpacity}))`,
							`linear-gradient(to right, rgba(0, 184, 219, ${lowBGOpacity}), rgba(43, 127, 255, ${mainBGOpacity}), rgba(173, 70, 255, ${mainBGOpacity}))`,
						]
					}}
					initial={{ backgroundImage: `linear-gradient(to right, rgba(0, 184, 219, ${lowBGOpacity}), rgba(43, 127, 255, ${mainBGOpacity}), rgba(173, 70, 255, ${mainBGOpacity}))` }}
					transition={{
						duration: 15,
						repeat: Infinity,
						times: [0, 0.25, 0.5, 0.75, 1],
					}}
				/>
				<div className="relative flex flex-col items-center justify-center max-w-5xl mx-auto">
					<motion.div
						className="flex items-center justify-center gap-6 mb-6 w-fit"
						animate={{
							opacity: 1,
							y: 0,
							transition: { duration: 0.5, ease: "easeOut" },
						}}
						initial={{ opacity: 0, y: 20 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 15,
						}}
					>
						<h1 className="text-5xl md:text-7xl font-black text-white [letter-spacing:-0.02em]">
							<span className="text-gray-300">HI! I'M</span>{" "}
							<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
								PAUL
							</span>
						</h1>
					</motion.div>
					<p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
						I'm a full-stack developer who loves building robust, scalable
						infrastructure
					</p>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
						Welcome to my personal website!
					</p>
					<MediaIcons size={30} extended />
				</div>
			</section>
		</div>
	);
}
