import React from "react";
import { CopyButton, OpenButton } from "../Buttons";
import { trimProtocolAndQueryString } from "../../Utils";

export default function ServerIPInfo({ urlArray, isLink, linkVerb, header }) {
	return (
		<>
			{urlArray?.length > 0 ? (
				<>
					<h5 className="text-uppercase">{header ? header : "IP-Osoite"}</h5>
					<table className="ip-info-table">
						<tbody>
							{urlArray.map((url, index) => (
								<tr key={index}>
									<td className="server-ip">
										{isLink ? (
											<a href={url} target="_blank" rel="noreferrer">
												{trimProtocolAndQueryString(url)}
											</a>
										) : (
											trimProtocolAndQueryString(url)
										)}
									</td>
									<td>
										<CopyButton targetUrl={url} />
										{isLink ? <OpenButton href={url} verb={linkVerb} /> : null}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : null}
		</>
	);
}
