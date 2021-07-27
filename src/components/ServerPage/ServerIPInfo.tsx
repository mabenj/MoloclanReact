import { CopyButton, OpenButton } from "../Buttons";
import { trimProtocolAndQueryString } from "../../Utils";

const ServerIPInfo = ({
	urlArray,
	isLink,
	linkVerb,
	header = "IP-Osoite"
}: {
	urlArray: string[];
	isLink: boolean;
	linkVerb: string;
	header?: string;
}) => {
	return (
		<>
			<h5 className="text-uppercase">{header}</h5>
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
						<CopyButton targetText={url} />
					</span>
				</div>
			))}
		</>
	);
};

export default ServerIPInfo;
