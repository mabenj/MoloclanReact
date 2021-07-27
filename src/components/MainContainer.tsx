import { useEffect } from "react";
import { Container } from "react-bootstrap";

const Y_OFFSET_MULTIPLIER = 0.1;

const MainContainer = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		const [initialX, initialY] = getBodyBackgroundPositionInitialXY();
		window.addEventListener("scroll", () => handleScroll(initialX, initialY));
		return () =>
			window.removeEventListener("scroll", () =>
				handleScroll(initialX, initialY)
			);
	}, []);

	return (
		<main>
			<Container fluid="md">{children}</Container>
		</main>
	);
};

function getBodyBackgroundPositionInitialXY(): number[] {
	const initialBgPosition = window.getComputedStyle(
		document.body
	).backgroundPosition;
	const initialX = parseInt(initialBgPosition.split(" ")[0]);
	const initialY = parseInt(initialBgPosition.split(" ")[1]);
	return [initialX, initialY];
}

function handleScroll(initialX: number, initialY: number): void {
	const bgOffsetY = -window.pageYOffset * Y_OFFSET_MULTIPLIER;
	const newY = initialY + bgOffsetY;
	document.body.style.backgroundPosition = `${initialX}px ${newY}px`;
}

export default MainContainer;
