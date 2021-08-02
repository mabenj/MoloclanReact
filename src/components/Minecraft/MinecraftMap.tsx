import { useState } from "react";

const DYNMAP_IMG_SRC = "https://i.imgur.com/kGlqBBD.png";
const HOVER_ZOOM_SCALE = 1.1;

const MinecraftMap = ({ mapUrl }: { mapUrl: string }) => {
	const [isHovering, setIsHovering] = useState(false);

	const mapImageStyle: React.CSSProperties = {
		transform: isHovering ? `scale(${HOVER_ZOOM_SCALE})` : "scale(1)",
		transition: "all 200ms ease"
	};

	const imageContainerStyle: React.CSSProperties = {
		overflow: "hidden"
	};

	return (
		<a href={mapUrl} target="_blank" rel="noreferrer">
			<div className="rounded" style={imageContainerStyle}>
				<img
					src={DYNMAP_IMG_SRC}
					width={"100%"}
					alt="molocraft map"
					className="img-fluid"
					style={mapImageStyle}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				/>
			</div>
		</a>
	);
};

export default MinecraftMap;
