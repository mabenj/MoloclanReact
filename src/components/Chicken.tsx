import React, { useState, useEffect } from "react";
import chickenImageSources from "../MediaSources/flying-chicken-sources.json";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IExternalMediaSource from "../MediaSources/IExternalMediaSource";
import { getImgurUrl } from "../Utils";

const chickens = chickenImageSources as IExternalMediaSource[];

const style: React.CSSProperties = {
	position: "absolute",
	right: "40px",
	top: "-5px"
};

const Chicken = () => {
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
};

const ChickenImg = ({ isFlying }: { isFlying: boolean }) => {
	const [currentChicken, setCurrentChicken] = useState<IExternalMediaSource>(
		chickens[0]
	);
	const [maxX, setMaxX] = useState(0);
	const [maxY, setMaxY] = useState(0);
	const [currentX, setCurrentX] = useState(0);
	const [currentY, setCurrentY] = useState(0);
	const [down, setDown] = useState(Math.random() > 0.5);
	const [right, setRight] = useState(Math.random() > 0.5);

	const STEP = 4;
	const FREQ_MS = 15;

	useEffect(() => {
		const chicken = chickens[Math.floor(Math.random() * chickens.length)];
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
				let tempX = currentX;
				let tempY = currentY;

				if (tempX >= maxX || tempX <= 0) {
					tempRight = tempX <= 0;
					updateChicken();
				}
				if (tempY >= maxY || tempY <= 0) {
					tempDown = tempY <= 0;
					updateChicken();
				}

				setCurrentX((prev) => (tempRight ? prev + STEP : prev - STEP));
				setCurrentY((prev) => (tempDown ? prev + STEP : prev - STEP));
				setDown(tempDown);
				setRight(tempRight);
			}
		}, FREQ_MS);
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
		let chicken = chickens[Math.floor(Math.random() * chickens.length)];
		while (chicken === currentChicken) {
			chicken = chickens[Math.floor(Math.random() * chickens.length)];
		}
		const maxWidth = window.innerWidth - chicken.width;
		const maxHeight = window.innerHeight - chicken.height;
		setMaxX(maxWidth);
		setMaxY(maxHeight);
		setCurrentChicken(chicken);
	};

	const chickenStyle: React.CSSProperties = {
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
			src={getImgurUrl(currentChicken.id, "", ".png")}
			alt={currentChicken.desc}
			style={chickenStyle}
		/>
	);
};

export default Chicken;
