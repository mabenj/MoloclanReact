import ServerSection from "../components/ServerPage/ServerSection";
import ServerIPInfo from "../components/ServerPage/ServerIPInfo";
import TSViewer from "../components/TSViewer/TSViewer";
import MinecraftCard from "../components/Minecraft/MinecraftCard";
import MinecraftMap from "../components/Minecraft/MinecraftMap";
import DiscordCard from "../components/Discord/DiscordCard";
import Wrapper from "../components/Wrapper";

const TEAMSPEAK_URL_ARRAY = [
	"ts3server://tessu.moloclan.fi?port=7010",
	"ts3server://ts.moloclan.fi?port=7010"
];
const MINECRAFT_URL_ARRAY = ["mine.moloclan.fi", "mc.moloclan.fi"];
const TEAMSPEAK_FA_ICON = ["fab", "teamspeak"];
const DISCORD_FA_ICON = ["fab", "discord"];
const MINECRAFT_FA_ICON = ["fac", "minecraft"];
const MINECRAFT_MAP_URL =
	"https://map.hearthcraft.net/?worldname=SMP_Map3_9&mapname=flat&zoom=4&x=113&y=64&z=95" ||
	"https://moloclan.fi/map";

export default function Servers() {
	return (
		<>
			<Wrapper id="teamspeak3">
				<ServerSection
					serverComponent={<TSViewer />}
					infoComponent={
						<ServerIPInfo
							urlArray={TEAMSPEAK_URL_ARRAY}
							isLink
							linkVerb="Joinaa"
						/>
					}
					header="TeamSpeak&nbsp;3"
					faIcon={TEAMSPEAK_FA_ICON}
				/>
			</Wrapper>

			<Wrapper id="minecraft">
				<ServerSection
					serverComponent={<MinecraftCard />}
					infoComponent={<ServerIPInfo urlArray={MINECRAFT_URL_ARRAY} />}
					header="Minecraft"
					faIcon={MINECRAFT_FA_ICON}
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

			<Wrapper id="discord">
				<ServerSection
					serverComponent={<DiscordCard />}
					header="Discord"
					faIcon={DISCORD_FA_ICON}
				/>
			</Wrapper>
		</>
	);
}
