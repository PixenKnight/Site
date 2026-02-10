import { SiGithub, SiSteam } from "@icons-pack/react-simple-icons";

export type IconType = "github" | "linkedin" | "steam";

export type MediaIconsProps = {
	size?: number;
	exclude?: IconType | IconType[];
	extended?: boolean;
};

export type IconProps = {
	size?: number;
	extended?: boolean;
};

export function MotionIcon({size, fill1, fill2}: {size: number, fill1: string, fill2: string}) {
	return (
		<svg display="block" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" fill="inherit">
			<path d="M 0 6 C 0 2.686 2.686 0 6 0 L 29 0 C 32.314 0 35 2.686 35 6 L 35 29 C 35 32.314 32.314 35 29 35 L 6 35 C 2.686 35 0 32.314 0 29 Z" fill={fill1} height={size} width={size}/>
			<path d="M 9.587 0 L 4.57 9 L 0 9 L 3.917 1.972 C 4.524 0.883 6.039 0 7.301 0 Z M 20.794 2.25 C 20.794 1.007 21.817 0 23.079 0 C 24.341 0 25.364 1.007 25.364 2.25 C 25.364 3.493 24.341 4.5 23.079 4.5 C 21.817 4.5 20.794 3.493 20.794 2.25 Z M 10.443 0 L 15.013 0 L 9.997 9 L 5.427 9 Z M 15.841 0 L 20.411 0 L 16.494 7.028 C 15.887 8.117 14.372 9 13.11 9 L 10.825 9 Z" fill={fill2} height={(9/35) * size} transform="translate(5 13)" width={(25.363635327216727/35) * size}/>
		</svg>
	)
}

function GitHubIcon(props: IconProps) {
	const size = props.size ?? 20;

	return (
		<a
			href="https://github.com/PixenKnight/Site"
			title="GitHub"
			target="_blank"
			rel="noopener noreferrer"
			className="hover:text-gray-300 text-gray-400 transition-colors cursor-pointer"
		>
			{props.extended ? (
				<button
					className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-lg border-2 border-slate-700 hover:border-slate-600 cursor-pointer"
					type="button"
				>
					<SiGithub name="githubIcon" size={size} className="cursor-pointer" />
					<label htmlFor="githubIcon" className="cursor-pointer">
						GitHub
					</label>
				</button>
			) : (
				<SiGithub size={size} />
			)}
		</a>
	);
}

function LinkedInIcon(props: IconProps) {
	const size = props.size ?? 20;

	return (
		<a
			href="https://www.linkedin.com/in/paul-mares"
			title="LinkedIn"
			target="_blank"
			rel="noopener noreferrer"
			className="fill-gray-400 text-gray-400 hover:fill-gray-300 hover:text-gray-300 transition-colors cursor-pointer"
		>
			{props.extended ? (
				<button
					className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-lg border-2 border-slate-700 hover:border-slate-600 cursor-pointer"
					type="button"
				>
					<svg
						role="img"
						aria-label="LinkedIn"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 72 72"
						width={size}
						height={size}
						fill="inherit"
					>
						<g xmlns="http://www.w3.org/2000/svg" fillRule="evenodd">
							<path
								d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
								fill="inherit"
							/>
							<path
								d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
								className="fill-slate-900 hover:fill-slate-800 transition-colors"
							/>
						</g>
					</svg>
					<label htmlFor="linkedinIcon" className="cursor-pointer">
						LinkedIn
					</label>
				</button>
			) : (
				<svg
					role="img"
					aria-label="LinkedIn"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 72 72"
					width={size}
					height={size}
					fill="inherit"
				>
					<g xmlns="http://www.w3.org/2000/svg" fillRule="evenodd">
						<path
							d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
							fill="inherit"
						/>
						<path
							d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
							fill="#101828"
						/>
					</g>
				</svg>
			)}
		</a>
	);
}

function SteamIcon(props: IconProps) {
	const size = props.size ?? 20;

	return (
		<a
			href="https://steamcommunity.com/id/PixenKnight/"
			title="Steam"
			target="_blank"
			rel="noopener noreferrer"
			className="hover:text-gray-300 text-gray-400 transition-colors"
		>
			{props.extended ? (
				<button
					className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-lg border-2 border-slate-700 hover:border-slate-600 cursor-pointer"
					type="button"
				>
					<SiSteam name="steamIcon" size={size} className="cursor-pointer" />
					<label htmlFor="steamIcon" className="cursor-pointer">
						Steam
					</label>
				</button>
			) : (
				<SiSteam size={size} />
			)}
		</a>
	);
}

export default function MediaIcons(props: MediaIconsProps) {
	const iconSize = props.size ?? 20;
	const iconsToRender: { [key in IconType]: boolean } = {
		github: true,
		linkedin: true,
		steam: true,
	};
	if (props.exclude) {
		const excludedIcons = Array.isArray(props.exclude)
			? props.exclude
			: [props.exclude];
		excludedIcons.forEach((icon) => {
			iconsToRender[icon] = false;
		});
	}

	return (
		<div className="flex gap-2 md:gap-4 text-gray-500 fill-gray-500 flex-row relative items-center justify-center max-w-[90%] flex-wrap">
			{iconsToRender.github && (
				<GitHubIcon size={iconSize} extended={props.extended} />
			)}
			{iconsToRender.linkedin && (
				<LinkedInIcon size={iconSize} extended={props.extended} />
			)}
			{iconsToRender.steam && (
				<SteamIcon size={iconSize} extended={props.extended} />
			)}
		</div>
	);
}
