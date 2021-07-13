import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "../../styles/mc.scss";

// const SERVER_IP = "104.152.140.171";
const SERVER_IP = "217.79.241.195";
const FAVICON_URL = `https://api.minetools.eu/favicon/${SERVER_IP}/25565`;
const FAVICON_URL_FALLBACK = "https://i.imgur.com/8XKJwE8t.jpg";
const QUERY_URL = `https://api.minetools.eu/query/${SERVER_IP}/25565`;
const NUMBER_OF_PLAYERS_TO_TAKE = 9;

export default function MinecraftCard() {
	const [players, setPlayers] = useState([]);
	const [playerCount, setPlayerCount] = useState(0);
	const [isOffline, setIsOffline] = useState(false);

	useEffect(() => {
		fetch(QUERY_URL)
			.then((response) => response.json())
			.then((data) => {
				setIsOffline(data.status === "ERR");
				setPlayers(data.Playerlist?.slice(0, NUMBER_OF_PLAYERS_TO_TAKE) || []);
				setPlayerCount(data.Playerlist?.length || 0);
			})
			.catch(console.error);
	}, []);

	return (
		<Container>
			<BackgroundImage />
			<Title isOffline={isOffline} />
			<PlayerList
				players={players}
				totalPlayerCount={playerCount}
				isOffline={isOffline}
			/>
		</Container>
	);
}

const Container = ({ children }) => {
	return <div className="rounded mc-container">{children}</div>;
};

const BackgroundImage = () => {
	return (
		<div className="mc-bg-container">
			<div className="mc-bg-image" />
		</div>
	);
};

const Title = ({ isOffline }) => {
	return (
		<span className={"mc-title"}>
			<h4 className="ml-2">MOLOCRAFT</h4>
			<img
				className="mc-fav-icon"
				src={isOffline ? FAVICON_URL_FALLBACK : FAVICON_URL}
				alt="favicon"
			/>
		</span>
	);
};

//TODO: https://crafatar.com/
//TODO: dynamic number of players to display depending on the width of the device
const PlayerList = ({ players, totalPlayerCount, isOffline }) => {
	return (
		<div className="mc-playerlist">
			<StatusText isOffline={isOffline} playerCount={totalPlayerCount} className="mc-playerlist-status" />
            <div className="mc-playerlist-players">
                {
                    players.map(playerName=>(
                        <span key={playerName}>
                            <FontAwesomeIcon icon="user"className="mr-2"/>
                            {playerName}
                        </span>
                    ))
                }
            </div>
		</div>
	);
};

const StatusText = ({ isOffline, playerCount, className }) => {
	return (
		<h4 className={`ml-2 pt-2 ${className}`}>
			{isOffline ? (
				<span className="badge badge-danger badge-pill">
					Servu on rikki tai jtn
				</span>
			) : (
				<>
					<span className="align-bottom">Paikalla&nbsp;</span>
					<span className="badge badge-success badge-pill">{playerCount}</span>
				</>
			)}
		</h4>
	);
};
