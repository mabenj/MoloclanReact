import React from "react";
import { Button } from "react-bootstrap";

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
						<td className="server-ip col-md-10">
							<a href={mapUrl}>{trimProtocol(mapUrl)}</a>
						</td>
						<td>
							<Button variant="warning">Avaa</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
