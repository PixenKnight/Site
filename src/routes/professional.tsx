import { useWindowWidth } from "@react-hook/window-size";
import { createFileRoute } from "@tanstack/react-router";

import {
	CircuitBoard,
	Computer,
	Route as RouteIcon,
	Server,
	Sparkles,
	SquareTerminal,
	SquareArrowOutUpRight,
} from "lucide-react";

import {
	SiReact,
	SiVite,
	SiGithub,
	SiTailwindcss,
	SiLucide,
	SiSimpleicons,
	SiCloudflare,
	SiTypescript,
	SiNodedotjs,
	SiBiome,
} from "@icons-pack/react-simple-icons";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

import Photo from "../components/Photo";
import { MotionIcon } from "../components/MediaIcons"

export const Route = createFileRoute("/professional")({
	component: RouteComponent,
});

const cards = [
	{
		icon: <Computer className="w-12 h-12 text-cyan-400" />,
		title: "Tech Enthusiast",
		description:
			'Anything tech-related catches my interest, from this website running on my Raspberry Pi to an EKS-deployed application. I love exploring all technologies and integrating them into my projects.',
	},
	{
		icon: <Server className="w-12 h-12 text-cyan-400" />,
		title: "Backend Expertise",
		description:
			"Skilled in building robust backend systems using Node.js, Express, and databases like MongoDB, Redis, and MySQL (and other SQL RDBs). This ensures seamless data flow and efficient server-side operations for my applications.",
	},
	{
		icon: <RouteIcon className="w-12 h-12 text-cyan-400" />,
		title: "Frontend Aficionado",
		description:
			"I may not have the best eye for design, but I am great at implementing a vision using React, Tailwind CSS, and modern frontend tools to create responsive and user-friendly interfaces (check out this site's tech stack below!).",
	},
	{
		icon: <SquareTerminal className="w-12 h-12 text-cyan-400" />,
		title: "Multilingual Developer",
		description:
			"Fluent in multiple programming languages and frameworks, enabling me to build applications that are both performant and maintainable. From Python to Java, from React to Expo, I adapt quickly to project needs.",
	},
	{
		icon: <CircuitBoard className="w-12 h-12 text-cyan-400" />,
		title: "Low-level Programming",
		description:
			"Although tedious, I find RISC-V Assembly and C programming fascinating. Understanding low-level programming enhances my overall coding skills and allows me to optimize performance-critical applications.",
	},
	{
		icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
		title: "AI-Powered Solutions",
		description:
			"Graduated with a BS in Computer Science and a concentration in Artificial Intelligence, I leverage AI and machine learning techniques to enhance and develop intelligent applications that solve complex problems.",
	},
];

const stack = [
	{ text: "React", url: "https://react.dev/", icon: <SiReact size={20} /> },
	{ text: "TanStack Router", url: "https://tanstack.com/router/", icon: <img width={20} height={20} src="/icons/tanstack.svg" style={{filter: "invert(1)"}}/> },
	{ text: "TanStack Start", url: "https://tanstack.com/start/", icon: <img width={20} height={20} src="/icons/tanstack.svg" style={{filter: "invert(1)"}}/> },
	{ text: "Vite", url: "https://vitejs.dev/", icon: <SiVite size={20} /> },
	{ text: "GitHub", url: "https://github.com/", icon: <SiGithub size={20} /> },
	{ text: "Motion", url: "https://motion.dev/", icon: <MotionIcon size={20} fill1="#fff" fill2="#1d293d" /> },
	{ text: "Tailwind", url: "https://tailwindcss.com/", icon: <SiTailwindcss size={20} /> },
	{ text: "Lucide", url: "https://lucide.dev/", icon: <SiLucide size={20} /> },
	{ text: "Simple Icons", url: "https://simpleicons.org/", icon: <SiSimpleicons size={20} /> },
	{ text: "Cloudflare", url: "https://www.cloudflare.com/", icon: <SiCloudflare size={20} /> },
	{ text: "TypeScript", url: "https://www.typescriptlang.org/", icon: <SiTypescript size={20} /> },
	{ text: "Node.JS", url: "https://nodejs.org/", icon: <SiNodedotjs size={20} /> },
	{ text: "Nitro", url: "https://nitro.unjs.io/", icon: <img width={20} height={20} src="/icons/nitro.svg" style={{filter: "saturate(0) contrast(2) brightness(2)"}}/> },
	{ text: "Biome", url: "https://biomejs.dev/", icon: <SiBiome size={20} /> },
	{ text: "Systemd & Bash", url: "https://systemd.io/", icon: <SquareTerminal size={20} /> },
]

const specialThanks = [
	{ text: "My Girlfriend", url: "https://www.linkedin.com/in/mya-escalante-0b3176214/"},
	{ text: "OKLCH Color Picker", url: "https://oklch.com/" },
	{ text: "Raspberry Pi", url: "https://www.raspberrypi.com/" },
]

function Card({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<motion.div
			className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-colors hover:shadow-lg hover:shadow-cyan-500/10 opacity-0"
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			viewport={{ amount: 0.5 }}
		>
			<div className="mb-4">{icon}</div>
			<h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
			<p className="text-gray-400 leading-relaxed">{description}</p>
		</motion.div>
	);
}

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


function StackLI({ value, index, total }: {value: { text: string, url: string, icon?: React.ReactNode }, index: number, total: number}) {
	const lightnessBounds = [0.7224, 0.6217]
	const chromaBounds = [0.129759, 0.2589]
	const hueBounds = [217.9549, 305.31]

	const lightness = lightnessBounds[0] + (lightnessBounds[1] - lightnessBounds[0]) * (index / (total - 1));
	const chroma = chromaBounds[0] + (chromaBounds[1] - chromaBounds[0]) * (index / (total - 1));
	const hue = hueBounds[0] + (hueBounds[1] - hueBounds[0]) * (index / (total - 1));

	const borderColor = `oklch(${lightness} ${chroma} ${hue})`;

	return (
		<li
			key={value.text}
			className="w-max grow flex"
		>
			<a 
				href={value.url} 
				target="_blank" 
				rel="noopener noreferrer" 
				className="flex items-center gap-1 border-2 rounded-md grow justify-center w-max p-2 bg-slate-800 hover:bg-slate-700 fill-slate-800 hover:fill-slate-700 transition-colors text-white fill-white cursor-pointer"
				style={{ borderColor: borderColor }}
			>
				{value.icon}
				{value.text}
			</a>
		</li>
	)
}

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
				className="h-fit top-0 relative py-10 px-6 items-center flex flex-col justify-center gap-20"
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
							imgClasses: "md:w-[100rem] not-md:max-w-xs",
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
						<p className="text-gray-300 mt-4 text-lg">
							I'm a Full-Stack Software Engineer with a passion for building great products and learning new technologies.
							I love working on teams that value each of their members and foster a collaborative environment (live pair coding sessions are my favorite!).
						</p>
						<p className="text-gray-300 mt-4 text-lg">
							I'm currently working at a stealth startup called Consilient Labs, where we're trying to make the LLM world more deterministic
							and easier to use, while keeping a human-centric approach in mind. You can learn more on <a
								target="_blank"
								rel="noopener noreferrer"
								href="https://consilientlabs.io/"
								className="text-cyan-400 hover:underline"
							>
								our website
								<SquareArrowOutUpRight className="inline w-4 h-4 ml-1 mb-1" />
							</a>.
						</p>
					</div>
				</div>
				<div className="">
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
							window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
						}}
					>
						<p className="mb-[-0.5rem]">Scroll Down</p>
						<p>&#x2304;</p>
					</motion.span>
				</div>
			</motion.section>
			<section className="py-16 px-6 w-full mx-auto bg-slate-900 flex justify-center items-center">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
					{cards.map((feature) => (
						<Card
							key={feature.title}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</div>
			</section>
			<section className="py-16 px-6 max-w-7xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<div className="flex justify-center w-full">
						<h2 className="text-4xl font-bold text-white mb-4">
							This Website's Tech Stack
						</h2>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="gap-8 flex flex-col items-center"
					>
						<ul className="text-white list-none flex flex-row gap-2 relative items-center justify-center max-w-[90%] md:max-w-[60%] flex-wrap">
							{stack.map((value, index) => (
								<StackLI key={value.text} value={value} index={index} total={stack.length} />
							))}
						</ul>
						<p className="text-white text-center">With special thanks to:</p>
						<ul className="text-white list-none flex flex-row gap-2 relative items-center justify-center max-w-[90%] md:max-w-[60%] flex-wrap">
							{specialThanks.map((value, index) => (
								<StackLI key={value.text} value={value} index={index} total={specialThanks.length} />
							))}
						</ul>
					</motion.div>
				</div>
			</section>
		</motion.div>
	);
}
