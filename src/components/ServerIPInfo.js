import React from "react";
import CopyButton from "../components/CopyButton";

export default function ServerIPInfo({ ipArray }) {
	return (
		<>
			<h5>IP-OSOITE</h5>
			<table className="ip-info-table">
				<tbody>
					{ipArray.map((ip, index) => (
						<tr key={index}>
							<td className="server-ip">{ip}</td>
							<td>
								<CopyButton target={ip} variant="warning" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
