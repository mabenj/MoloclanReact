import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

export default function MainContainer(props) {
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
			<Container fluid="md">{props.children}</Container>
		</main>
	);
}

function getBodyBackgroundPositionInitialXY() {
	const initialBgPosition = window.getComputedStyle(
		document.body
	).backgroundPosition;
	const initialX = parseInt(initialBgPosition.split(" ")[0]);
	const initialY = parseInt(initialBgPosition.split(" ")[1]);
	return [initialX, initialY];
}

function handleScroll(initialX, initialY) {
	const bgOffsetY = -window.pageYOffset * 0.05;
	const newY = initialY + bgOffsetY;
	document.body.style.backgroundPosition = `${initialX}px ${newY}px`;
}
