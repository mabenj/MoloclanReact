import React, { useState } from "react";
import Dynmap from "../../img/dynmap.jpg";

const HOVER_ZOOM_SCALE = 1.1;

export default function MinecraftMap({ mapUrl }) {
	const [isHovering, setIsHovering] = useState(false);
	return (
		<a href={mapUrl} target="_blank" rel="noreferrer">
			<div className="rounded" style={{ overflow: "hidden" }}>
				<img
					src={Dynmap}
					alt="molocraft map"
					class="img-fluid"
					style={{
						transform: isHovering ? `scale(${HOVER_ZOOM_SCALE})` : "scale(1)",
						transition: "all 200ms ease"
					}}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				/>
			</div>
		</a>
	);
}
