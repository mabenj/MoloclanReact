import React, { useState, useEffect } from "react";
import MoloBigText from "./MoloBigText";
import Defs from "./Defs";
import Texts from "./Texts/TextsContainer";
import TextViralliset from "./Texts/TextViralliset";
import TextD from "./Texts/TextD";
import TextSivut from "./Texts/TextSivut";
import LinesContainer from "./Lines/LinesContainer";
import LineTopLeft from "./Lines/LineTopLeft";
import LineTopRight from "./Lines/LineTopRight";
import LineBottomLeft from "./Lines/LineBottomLeft";
import LineBottomRight from "./Lines/LineBottomRight";

import "../../styles/mologo.scss";
import "../../styles/hover.css";

const BIG_TEXT_ANIMATIONS = [
	"hvr-wobble-horizontal",
	"hvr-wobble-vertical",
	"hvr-wobble-to-bottom-right",
	"hvr-wobble-to-top-right"
];

export default function MoloLogo() {
	const [bigTextClass, setBigTextClass] = useState("");
	const [upperClass, setUpperClass] = useState("upper");
	const [lowerClass, setLowerClass] = useState("lower");
	const [bigTextAnimationIndex, setBigTextAnimationIndex] = useState(-1);

	useEffect(() => {
		setBigTextClass(`${BIG_TEXT_ANIMATIONS[bigTextAnimationIndex]}`);
	}, [bigTextAnimationIndex]);

	function startAnimation() {
		setBigTextAnimationIndex((prev) => {
			let newIndex = Math.floor(Math.random() * BIG_TEXT_ANIMATIONS.length);
			while (newIndex === prev) {
				newIndex = Math.floor(Math.random() * BIG_TEXT_ANIMATIONS.length);
			}
			return newIndex;
		});
		setUpperClass(`upper hvr-backward`);
		setLowerClass(`lower hvr-forward`);
	}

	function endAnimation() {
		// setBigTextClass(`${BIG_TEXT_ANIMATIONS[bigTextAnimationIndex]}`);
		setUpperClass(`upper`);
		setLowerClass(`lower`);
	}

	return (
		<>
			<div id="banner-container">
				<svg
					id="banner-svg"
					width="530"
					height="250"
					viewBox="0 0 530 250"
					fill="none"
					onMouseEnter={startAnimation}
					onMouseLeave={endAnimation}>
					<g id="banner">
						<MoloBigText className={bigTextClass} />
						<Texts>
							<TextViralliset className={upperClass} />
							<TextD className={upperClass} />
							<TextSivut className={lowerClass} />
						</Texts>
						<LinesContainer>
							<LineTopLeft className={upperClass} />
							<LineTopRight className={upperClass} />
							<LineBottomLeft className={lowerClass} />
							<LineBottomRight className={lowerClass} />
						</LinesContainer>
						<Defs />
					</g>
				</svg>
			</div>
		</>
	);
}
