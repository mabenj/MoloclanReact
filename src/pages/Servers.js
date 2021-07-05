import React, { useEffect } from "react";
import ServerSection from "../components/ServerSection";
import TSViewer from "../components/TSViewer/TSViewer";
import MinecraftCard from "../components/Minecraft/MinecraftCard";
import MinecraftMap from "../components/Minecraft/MinecraftMap";
import ServerIPInfo from "../components/ServerIPInfo";
import Wrapper from "../components/Wrapper";

const TEAMSPEAK_URL_ARRAY = [
	"ts3server://tessu.moloclan.fi?port=7010",
	"ts3server://ts.moloclan.fi?port=7010"
];
const MINECRAFT_URL_ARRAY = ["mine.moloclan.fi", "mc.moloclan.fi"];
const TEAMSPEAK_FA_ICON = ["fab", "teamspeak"];
const DISCORD_FA_ICON = ["fab", "discord"];
const MINECRAFT_MAP_URL = "https://moloclan.fi/map";

export default function Servers({ documentTitle }) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return (
		<>
			<Wrapper>
				<ServerSection
					serverComponent={<TSViewer />}
					infoComponent={
						<ServerIPInfo
							urlArray={TEAMSPEAK_URL_ARRAY}
							isLink
							linkVerb="Joinaa"
						/>
					}
					displayName="TeamSpeak&nbsp;3"
					faIcon={TEAMSPEAK_FA_ICON}
				/>
			</Wrapper>

			<Wrapper>
				<ServerSection
					serverComponent={<MinecraftCard />}
					infoComponent={<ServerIPInfo urlArray={MINECRAFT_URL_ARRAY} />}
					displayName="Minecraft"
				/>
				<ServerSection
					serverComponent={<MinecraftMap mapUrl={MINECRAFT_MAP_URL} />}
					infoComponent={
						<ServerIPInfo
							urlArray={[MINECRAFT_MAP_URL]}
							isLink
							linkVerb="Avaa"
							header="Servun Mappi"
						/>
					}
				/>
			</Wrapper>

			<Wrapper>
				<ServerSection
					serverComponent={<Discord />}
					displayName="Discord"
					faIcon={DISCORD_FA_ICON}
				/>
			</Wrapper>
		</>
	);
}

const Discord = () => {
	return (
		<>
			<code>HYÖÖRG</code>
		</>
	);
};
