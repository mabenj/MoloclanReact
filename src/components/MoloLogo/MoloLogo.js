import React, { useState } from "react";
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

import "../../hover.css";

const BIG_TEXT_ANIMATIONS = [
	"hvr-wobble-top",
	"hvr-wobble-top",
	"hvr-wobble-bottom",
	"hvr-wobble-skew"
];

export default function MoloLogo() {
	const [bigTextAnimationIndex, setBigTextAnimationIndex] = useState(-1);

	function startAnimation() {
		setBigTextAnimationIndex(
			Math.floor(Math.random() * BIG_TEXT_ANIMATIONS.length)
		);
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
					onMouseEnter={startAnimation}>
					<g id="banner">
						<MoloBigText
							className={
								bigTextAnimationIndex < 0
									? ""
									: BIG_TEXT_ANIMATIONS[bigTextAnimationIndex]
							}
						/>
						<Texts>
							<TextViralliset />
							<TextD />
							<TextSivut />
						</Texts>
						<LinesContainer>
							<LineTopLeft />
							<LineTopRight />
							<LineBottomLeft />
							<LineBottomRight />
						</LinesContainer>
						<Defs />
					</g>
				</svg>
			</div>
		</>
	);
}
