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

interface IChickenPositionData {
	maxX: number;
	maxY: number;
	currentX: number;
	currentY: number;
	directionX: "west" | "east";
	directionY: "north" | "south";
}

const ChickenImg = ({ isFlying }: { isFlying: boolean }) => {
	const [currentChicken, setCurrentChicken] = useState<IExternalMediaSource>(
		chickens[0]
	);
	const [positionData, setPositionData] = useState<IChickenPositionData>({
		maxX: 0,
		maxY: 0,
		currentX: 0,
		currentY: 0,
		directionX: Math.random() > 0.5 ? "west" : "east",
		directionY: Math.random() > 0.5 ? "north" : "south"
	});

	const STEP = 12;
	const FREQ_MS = 60;

	useEffect(() => {
		const chicken = chickens[Math.floor(Math.random() * chickens.length)];
		const maxWidth = window.innerWidth - chicken.width;
		const maxHeight = window.innerHeight - chicken.height;
		setPositionData((prev) => ({
			...prev,
			maxX: maxWidth,
			maxY: maxHeight,
			currentX: Math.random() * maxWidth,
			currentY: Math.random() * maxHeight
		}));
		setCurrentChicken(chicken);
		window.addEventListener("resize", () => updateMaxXY(maxWidth, maxHeight));
		return () => {
			window.removeEventListener("resize", () =>
				updateMaxXY(maxWidth, maxHeight)
			);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (isFlying) {
				let tempDirectionX = positionData.directionX;
				let tempDirectionY = positionData.directionY;
				let tempX = positionData.currentX;
				let tempY = positionData.currentY;

				if (tempX >= positionData.maxX || tempX <= 0) {
					tempDirectionX = tempX <= 0 ? "east" : "west";
					updateChicken();
				}
				if (tempY >= positionData.maxY || tempY <= 0) {
					tempDirectionY = tempY <= 0 ? "south" : "north";
					updateChicken();
				}

				setPositionData((prev) => ({
					...prev,
					currentX:
						tempDirectionX === "east"
							? prev.currentX + STEP
							: prev.currentX - STEP,
					currentY:
						tempDirectionY === "south"
							? prev.currentY + STEP
							: prev.currentY - STEP,
					directionX: tempDirectionX,
					directionY: tempDirectionY
				}));
			}
		}, FREQ_MS);
		return () => {
			clearTimeout(timeOut);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isFlying,
		positionData.currentX,
		positionData.currentY,
		positionData.directionX,
		positionData.directionY,
		positionData.maxX,
		positionData.maxY
	]);

	const updateMaxXY = (maxX: number, maxY: number) => {
		setPositionData((prev) => ({ ...prev, maxX, maxY }));
	};

	const updateChicken = () => {
		let chicken = chickens[Math.floor(Math.random() * chickens.length)];
		while (chicken === currentChicken) {
			chicken = chickens[Math.floor(Math.random() * chickens.length)];
		}
		const maxWidth = window.innerWidth - chicken.width;
		const maxHeight = window.innerHeight - chicken.height;
		updateMaxXY(maxWidth, maxHeight);
		setCurrentChicken(chicken);
	};

	const chickenStyle: React.CSSProperties = {
		display: isFlying ? "initial" : "none",
		transform: `translate3d(${positionData.currentX}px, ${positionData.currentY}px, 0)`,
		position: "fixed",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		cursor: "not-allowed",
		transition: `transform ${FREQ_MS}ms linear`
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
