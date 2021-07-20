import axios from "axios";

// const SERVER_IP = "maailmanloppu.fi	";
const SERVER_IP = "104.152.140.171";
// const SERVER_IP = "217.79.241.195";
// const SERVER_IP = "mc.moloclan.fi";
const QUERY_URL = `https://api.minetools.eu/query/${SERVER_IP}/25565`;
const FAVICON_URL = `https://api.minetools.eu/favicon/${SERVER_IP}/25565`;
const FAVICON_URL_FALLBACK = "https://i.imgur.com/8XKJwE8t.jpg";
const FAVICON_HEROBRINE =
	"https://pbs.twimg.com/profile_images/1239076087981694976/FYYqp8a4.png";
const HEROBRINE_AVATAR_URL =
	"https://lh3.googleusercontent.com/vlHjs581Tvn1vxp0upYCuX6xNvfHk-49vjnh-v0XAkW9Vs2ETzwSGqPOOnmZTTk6bNw4Y185XWaafYFFQR8VdA";
const AVATAR_API_URL = "https://minotar.net/body/";

const getServerInfo = async (numberOfPlayersToTake, avatarWidth) => {
	try {
		const { data } = await axios.get(QUERY_URL);
		const isOnline = data.status !== "ERR";
		const result = {
			isOnline: isOnline,
			players:
				data.Playerlist?.slice(0, numberOfPlayersToTake)?.map((playerName) => ({
					name: playerName,
					skinSource: `${AVATAR_API_URL}${playerName}/${avatarWidth}.png`
				})) || [],
			playerCount: data.Players,
			favIcon: isOnline ? FAVICON_URL : FAVICON_URL_FALLBACK
		};
		if (result.isOnline && result.playerCount === 0) {
			const showHerobrine = Math.random() < 0.3;
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
		return console.error(message);
	}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getServerInfo };