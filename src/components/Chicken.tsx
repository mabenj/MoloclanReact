import React, { useState, useEffect, useLayoutEffect } from "react";
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

	const STEP = 1.5;

	useEffect(() => {
		const chicken = chickens[Math.floor(Math.random() * chickens.length)];
		const maxWidth = window.innerWidth - currentChicken.width;
		const maxHeight = window.innerHeight - currentChicken.height;
		setPositionData((prev) => ({
			...prev,
			maxX: maxWidth,
			maxY: maxHeight,
			currentX: Math.random() * maxWidth,
			currentY: Math.random() * maxHeight
		}));
		setCurrentChicken(chicken);
		window.addEventListener("resize", () => updateMaxXY());
		return () => {
			window.removeEventListener("resize", () => updateMaxXY());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		let rafId: number;
		if (isFlying) {
			const animate = () => {
				setPositionData((prev) => {
					let tempDirectionX = prev.directionX;
					let tempDirectionY = prev.directionY;
					let tempX = prev.currentX;
					let tempY = prev.currentY;

					if (tempX >= prev.maxX || tempX <= 0) {
						tempDirectionX = tempX <= 0 ? "east" : "west";
						updateChicken();
					}
					if (tempY >= prev.maxY || tempY <= 0) {
						tempDirectionY = tempY <= 0 ? "south" : "north";
						updateChicken();
					}

					return {
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
					};
				});
				rafId = requestAnimationFrame(animate);
			};

			rafId = requestAnimationFrame(animate);
		}
		return () => cancelAnimationFrame(rafId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFlying]);

	const updateMaxXY = () => {
		const maxX = window.innerWidth - currentChicken.width;
		const maxY = window.innerHeight - currentChicken.height;
		setPositionData((prev) => ({ ...prev, maxX, maxY }));
	};

	const updateChicken = () => {
		setCurrentChicken((prev) => {
			let chicken = chickens[Math.floor(Math.random() * chickens.length)];
			while (chicken === prev) {
				chicken = chickens[Math.floor(Math.random() * chickens.length)];
			}
			const maxX = window.innerWidth - currentChicken.width;
			const maxY = window.innerHeight - currentChicken.height;
			setPositionData((prev) => ({ ...prev, maxX, maxY }));
			return chicken;
		});
	};

	const chickenStyle: React.CSSProperties = {
		display: isFlying ? "initial" : "none",
		transform: `translate3d(${positionData.currentX}px, ${positionData.currentY}px, 0)`,
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
