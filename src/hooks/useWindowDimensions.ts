import { useState, useEffect } from "react";

interface IDimensions {
	width: number;
	height: number;
}

function getWindowDimensions(): IDimensions {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

const useWindowDimensions = (): IDimensions => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize(): void {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
