import React, { useState, useEffect } from "react";
import ChickenImages from "../img/MediaSources/flying-chicken-sources.json";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
	position: "absolute",
	right: "40px",
	top: "-5px"
};

export default function Chicken() {
	const [isFlying, setIsFlying] = useState(false);

	return (
		<div style={style}>
			<div className="orange-toggle">
				<Toggle
					checked={isFlying}
					onChange={(e) => setIsFlying(e.target.checked)}
					className="orange-toggle"
					icons={{
						checked: <FontAwesomeIcon className="pb-1" icon="drumstick-bite" />,
						unchecked: null
					}}
				/>
			</div>
			<ChickenImg isFlying={isFlying} />
		</div>
	);
}

const ChickenImg = ({ isFlying }) => {
	const [currentChicken, setCurrentChicken] = useState({});
	const [maxX, setMaxX] = useState(0);
	const [maxY, setMaxY] = useState(0);
	const [currentX, setCurrentX] = useState(0);
	const [currentY, setCurrentY] = useState(0);
	const [down, setDown] = useState(true);
	const [right, setRight] = useState(true);
	const step = 4;
	const updateMillis = 15;

	useEffect(() => {
		const chicken =
			ChickenImages[Math.floor(Math.random() * ChickenImages.length)];
		const maxWidth = window.innerWidth - chicken.width;
		const maxHeight = window.innerHeight - chicken.height;
		setMaxX(maxWidth);
		setMaxY(maxHeight);
		setCurrentX(Math.floor(Math.random() * maxWidth));
		setCurrentY(Math.floor(Math.random() * maxHeight));
		setCurrentChicken(chicken);
		window.addEventListener("resize", updateMaxXY);
		return () => {
			window.removeEventListener("resize", updateMaxXY);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (isFlying) {
				let tempRight = right;
				let tempDown = down;
				if (currentX >= maxX || currentX <= 0) {
					tempRight = currentX <= 0;
					updateChicken();
				}
				if (currentY >= maxY || currentY <= 0) {
					tempDown = currentY <= 0;
					updateChicken();
				}
				setCurrentX((prev) => (tempRight ? prev + step : prev - step));
				setCurrentY((prev) => (tempDown ? prev + step : prev - step));
				setDown(tempDown);
				setRight(tempRight);
			}
		}, updateMillis);
		return () => {
			clearTimeout(timeOut);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentX, currentY, down, isFlying, maxX, maxY, right]);

	const updateMaxXY = () => {
		const maxWidth = window.innerWidth - currentChicken.width;
		const maxHeight = window.innerHeight - currentChicken.height;
		setMaxX(maxWidth);
		setMaxY(maxHeight);
	};

	const updateChicken = () => {
		let chicken =
			ChickenImages[Math.floor(Math.random() * ChickenImages.length)];
		while (chicken === currentChicken) {
			chicken = ChickenImages[Math.floor(Math.random() * ChickenImages.length)];
		}
		const maxWidth = window.innerWidth - chicken.width;
		const maxHeight = window.innerHeight - chicken.height;
		setMaxX(maxWidth);
		setMaxY(maxHeight);
		setCurrentChicken(chicken);
	};

	const chickenStyle = {
		display: isFlying ? "initial" : "none",
		transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
		position: "fixed",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		cursor: "not-allowed"
	};

	return (
		<img
			src={currentChicken.src}
			alt={currentChicken.desc}
			style={chickenStyle}
		/>
	);
};
