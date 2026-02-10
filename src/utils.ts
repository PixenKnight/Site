import { useWindowWidth } from "@react-hook/window-size";

export function mdOrAbove() {
	const windowWidth = useWindowWidth();
	return windowWidth >= 768;
}