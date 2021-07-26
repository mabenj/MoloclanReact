import { CopyButton, OpenButton } from "../Buttons";
import { trimProtocolAndQueryString } from "../../Utils";

interface IServerIPInfo {
	urlArray: string[];
	isLink: boolean;
	linkVerb: string;
	header?: string;
}

const ServerIPInfo: React.FC<IServerIPInfo> = ({
	urlArray,
	isLink,
	linkVerb,
	header = "IP-Osoite"
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
