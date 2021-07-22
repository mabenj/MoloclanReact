import React from "react";
import { CopyButton, OpenButton } from "../Buttons";
import { trimProtocolAndQueryString } from "../../Utils";

export default function ServerIPInfo({ urlArray, isLink, linkVerb, header }) {
	if (urlArray?.length < 1) {
		return null;
	}

	return (
		<>
			<h5 className="text-uppercase">{header ? header : "IP-Osoite"}</h5>
			{urlArray.map((url) => (
				<div key={url} className="server-info">
					{isLink ? (
						<code>
							<a href={url} target="_blank" rel="noreferrer">
								{trimProtocolAndQueryString(url)}
							</a>
						</code>
					) : (
						<code className="user-select-all">
							{trimProtocolAndQueryString(url)}
						</code>
					)}
					<span>
						{isLink ? <OpenButton href={url} verb={linkVerb} /> : null}
						<CopyButton targetUrl={url} />
					</span>
				</div>
			))}
		</>
	);
}
