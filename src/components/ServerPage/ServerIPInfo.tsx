import { CopyButton, OpenButton } from "../Buttons";

const ServerIPInfo = ({
	urlArray,
	isLink = false,
	linkVerb = "",
	header = "IP-Osoite"
}: {
	urlArray: { url: string; displayUrl: string }[];
	linkVerb?: string;
	isLink?: boolean;
	header?: string;
}) => {
	return (
		<>
			<h5 className="text-uppercase">{header}</h5>
			{urlArray.map(({ url, displayUrl }) => (
				<div key={displayUrl} className="server-info">
					{isLink ? (
						<code>
							<a href={url} target="_blank" rel="noreferrer">
								{displayUrl}
							</a>
						</code>
					) : (
						<code className="user-select-all">{displayUrl}</code>
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
