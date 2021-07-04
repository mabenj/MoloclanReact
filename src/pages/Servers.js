import React from "react";
import ServerSection from "../components/ServerSection";
import TSViewer from "../components/TSViewer/TSViewer";
import MinecraftCard from "../components/Minecraft/MinecraftCard";
import MinecraftMap from "../components/Minecraft/MinecraftMap";
import MinecraftMapInfo from "../components/Minecraft/MinecraftMapInfo";
import ServerIPInfo from "../components/ServerIPInfo";

const TEAMSPEAK_IP_ARRAY = ["tessu.moloclan.fi", "ts.moloclan.fi"];
const MINECRAFT_IP_ARRAY = ["mine.moloclan.fi", "mc.moloclan.fi"];
const TEAMSPEAK_FA_ICON = ["fab", "teamspeak"];
const DISCORD_FA_ICON = ["fab", "discord"];
const MINECRAFT_MAP_URL = "https://moloclan.fi/map";

export default function Servers() {
	return (
		<>
			<div className="wrapper text-justify">
				<ServerSection
					serverComponent={<TSViewer />}
					infoComponent={<ServerIPInfo ipArray={TEAMSPEAK_IP_ARRAY} />}
					displayName="TeamSpeak&nbsp;3"
					faIcon={TEAMSPEAK_FA_ICON}
				/>
			</div>

			<div className="wrapper text-justify">
				<ServerSection
					serverComponent={<MinecraftCard />}
					infoComponent={<ServerIPInfo ipArray={MINECRAFT_IP_ARRAY} />}
					displayName="Minecraft"
				/>
				<ServerSection
					serverComponent={<MinecraftMap mapUrl={MINECRAFT_MAP_URL} />}
					infoComponent={<MinecraftMapInfo mapUrl={MINECRAFT_MAP_URL} />}
				/>
			</div>

			<div className="wrapper text-justify">
				<ServerSection
					serverComponent={<code>HYÖÖRG</code>}
					displayName="Discord"
					faIcon={DISCORD_FA_ICON}
				/>
			</div>
		</>
	);
}
