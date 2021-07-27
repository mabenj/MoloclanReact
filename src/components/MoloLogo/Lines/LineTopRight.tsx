import { IMoloLogoProps } from "../MoloLogoProps";

const LineTopRight = (props: IMoloLogoProps) => {
	return (
		<line
			{...props}
			id="line-tr"
			x1="385"
			y1="33.5"
			x2="489"
			y2="33.5"
			strokeWidth="5"
		/>
	);
};

export default LineTopRight;
