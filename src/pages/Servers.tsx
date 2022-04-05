import ServerSection from "../components/ServerPage/ServerSection";
import ServerIPInfo from "../components/ServerPage/ServerIPInfo";
import TSViewer from "../components/TSViewer/TSViewer";
import MinecraftCard from "../components/Minecraft/MinecraftCard";
import MinecraftMap from "../components/Minecraft/MinecraftMap";
import DiscordCard from "../components/Discord/DiscordCard";
import Wrapper from "../components/Wrapper";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const TEAMSPEAK_URL_ARRAY = [
	{
		displayUrl: "*****.moloclan.fi",
		url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	}
];
const MINECRAFT_URL_ARRAY = [
	{
		displayUrl: "mine.moloclan.fi",
		url: "mine.moloclan.fi"
	},
	{
		displayUrl: "mc.moloclan.fi",
		url: "mc.moloclan.fi"
	}
];

const TEAMSPEAK_FA_ICON: IconProp = ["fab", "teamspeak"];
const DISCORD_FA_ICON: IconProp = ["fab", "discord"];
const MINECRAFT_FA_ICON: IconProp = ["fac", "minecraft"];

const MINECRAFT_MAP_URL = {
	displayUrl: "https://moloclan.fi/map",
	url: "https://moloclan.fi/map"
};

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
					serverComponent={<MinecraftMap mapUrl={MINECRAFT_MAP_URL.url} />}
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
