import React from "react";

export default function MoloSvgContainer({ children }) {
	return (
		<div id="banner-container">
			<svg
				id="banner-svg"
				viewBox="0 0 530 250"
				fill="none">
				<g id="banner">{children}</g>
			</svg>
		</div>
	);
}
