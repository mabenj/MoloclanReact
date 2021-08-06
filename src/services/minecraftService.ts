import axios from "axios";

const SERVER_IP = "mc.moloclan.fi" || "104.152.140.171";
const QUERY_URL = `https://api.minetools.eu/query/${SERVER_IP}/25565`;
const FAVICON_URL = `https://api.minetools.eu/favicon/${SERVER_IP}/25565`;
const FAVICON_HEROBRINE =
	"https://pbs.twimg.com/profile_images/1239076087981694976/FYYqp8a4.png";
const HEROBRINE_AVATAR_URL =
	"https://lh3.googleusercontent.com/vlHjs581Tvn1vxp0upYCuX6xNvfHk-49vjnh-v0XAkW9Vs2ETzwSGqPOOnmZTTk6bNw4Y185XWaafYFFQR8VdA";
const AVATAR_API_URL = "https://minotar.net/body/";

const HEROBRINE_PROB = 0.05;

export interface IPlayer {
	name: string;
	skinSource: string;
}

interface IServerInfo {
	isOnline: boolean;
	players: IPlayer[];
	playerCount: number;
	favIcon: string | undefined;
}

const getServerInfo = async (
	numberOfPlayersToTake: number,
	avatarWidth: number
): Promise<IServerInfo> => {
	try {
		const { data } = await axios.get(QUERY_URL);
		const isOnline = data.status !== "ERR";
		const result: IServerInfo = {
			isOnline: isOnline,
			players:
				data.Playerlist?.slice(0, numberOfPlayersToTake)?.map(
					(playerName: string): IPlayer => ({
						name: playerName,
						skinSource: `${AVATAR_API_URL}${playerName}/${avatarWidth}.png`
					})
				) || [],
			playerCount: data.Players,
			favIcon: isOnline ? FAVICON_URL : undefined
		};
		if (result.isOnline && result.playerCount === 0) {
			const showHerobrine = Math.random() < HEROBRINE_PROB;
			if (showHerobrine) {
				return {
					isOnline: true,
					players: [{ name: "herobrine", skinSource: HEROBRINE_AVATAR_URL }],
					playerCount: 0,
					favIcon: FAVICON_HEROBRINE
				};
			}
		}
		return result;
	} catch (message) {
		console.error(message);
		return {
			isOnline: false,
			players: [],
			playerCount: 0,
			favIcon: undefined
		};
	}
};

const minecraftService = { getServerInfo };
export default minecraftService;
