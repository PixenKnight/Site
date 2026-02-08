import MediaIcons from "@/components/MediaIcons";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	MessageCircle
} from "lucide-react";

import { motion } from "motion/react";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900">
			<section className="relative py-20 px-6 text-center overflow-hidden h-[calc(100vh-72px)] flex flex-col justify-center">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-slow-pulse"></div>
				<div className="relative flex flex-col items-center max-w-5xl mx-auto">
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
						<h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.02em]">
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
					<p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
						Welcome to my personal website!
					</p>
					<MediaIcons size={30} extended />
				</div>
				{/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
					<motion.span
						className="text-gray-200 flex flex-col items-center hover:cursor-pointer"
						animate={{
							y: 0,
							opacity: 1,
						}}
						initial={{
							y: -10,
							opacity: 0,
						}}
						transition={{
							duration: 0.5,
							ease: "easeOut",
							delay: 0.2,
						}}
						whileHover={{
							y: -5,
							transition: {
								duration: 0.3,
								ease: "easeInOut",
							},
						}}
						onClick={() => {
							window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
						}}
					>
						<p className="mb-[-0.5rem]">Scroll Down</p>
						<p>&#x2304;</p>
					</motion.span>
				</div> */}
			</section>
		</div>
	);
}
