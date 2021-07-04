import React from "react";
import Dynmap from "../../img/dynmap.jpg";

export default function MinecraftMap({ mapUrl }) {
	return (
		<a href={mapUrl} target="_blank" rel="noreferrer">
			<img src={Dynmap} alt="molocraft map" class="img-fluid rounded" />
		</a>
	);
}
