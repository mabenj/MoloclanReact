import React from "react";
import ServerSection from "../components/ServerSection";
import TSViewer from "../components/TSViewer/TSViewer";
import MinecraftCard from "../components/MinecraftCard";

const TEAMSPEAK_IP_ARRAY = ["tessu.moloclan.fi", "ts.moloclan.fi"];
const MINECRAFT_IP_ARRAY = ["mine.moloclan.fi", "mc.moloclan.fi"];
const TEAMSPEAK_FA_ICON = ["fab", "teamspeak"];
const DISCORD_FA_ICON = ["fab", "discord"];

export default function Servers() {
	return (
		<>
			<ServerSection
				serverComponent={<TSViewer />}
				displayName="TeamSpeak&nbsp;3"
				faIcon={TEAMSPEAK_FA_ICON}
				ipArray={TEAMSPEAK_IP_ARRAY}
			/>
			<ServerSection
				serverComponent={<MinecraftCard />}
				displayName="Minecraft"
				ipArray={MINECRAFT_IP_ARRAY}
			/>
			<ServerSection
				serverComponent={<code>HYÖÖRG</code>}
				displayName="Discord"
				faIcon={DISCORD_FA_ICON}
			/>
		</>
	);
}
