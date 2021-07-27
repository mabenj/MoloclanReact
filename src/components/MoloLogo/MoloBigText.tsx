import { IMoloLogoProps } from "./MoloLogoProps";

const MoloBigText = (props: IMoloLogoProps) => {
	return (
		<rect
			{...props}
			id="img-logo"
			x="41"
			y="57"
			width="448"
			height="135"
			fill="url(#pattern0)"
		/>
	);
};

export default MoloBigText;
