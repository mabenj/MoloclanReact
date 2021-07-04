import React from "react";
import { CopyButton, OpenButton } from "../Buttons";

function trimProtocol(url) {
	return url.replace(/(^\w+:|^)\/\//, "");
}

export default function MinecraftMapInfo({ mapUrl }) {
	return (
		<>
			<h5>SERVUN MAPPI</h5>
			<table className="ip-info-table">
				<tbody>
					<tr>
						<td className="server-ip">
							<a href={mapUrl} target="_blank" rel="noreferrer">
								{trimProtocol(mapUrl)}
							</a>
						</td>
						<td>
							<CopyButton target={trimProtocol(mapUrl)} />
							<OpenButton href={mapUrl} />
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
