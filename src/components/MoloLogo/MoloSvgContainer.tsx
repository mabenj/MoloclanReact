import { IMoloLogoProps } from "./MoloLogoProps";

const MoloSvgContainer = (props: IMoloLogoProps) => {
	return (
		<div id="banner-container">
			<svg id="banner-svg" viewBox="0 0 530 250" fill="none">
				<g id="banner">{props.children}</g>
			</svg>
		</div>
	);
};

export default MoloSvgContainer;
