import MediaIcons from "./MediaIcons";

export default function Footer() {
	return (
		<footer className="flex flex-col gap-3 items-center justify-center w-full py-6 px-4 bg-gray-900 border-t border-gray-800 bottom-0">
			<p className="text-gray-500 text-xs">
				&copy; {new Date().getFullYear()} Paul Maresquier. All rights reserved. Made with ❤
			</p>
			<MediaIcons/>
		</footer>
	)
}