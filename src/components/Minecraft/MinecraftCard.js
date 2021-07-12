import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import "../../styles/mc.scss";

const SERVER_IP = "51.79.162.160";
const FAVICON_URL = `https://api.minetools.eu/favicon/${SERVER_IP}/25565`;
const FAVICON_URL_FALLBACK = "https://i.imgur.com/8XKJwE8t.jpg";
const QUERY_URL = `https://api.minetools.eu/query/${SERVER_IP}/25565`;
const NUMBER_OF_PLAYERS_TO_TAKE = 20;

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
			{/* <Title isOffline={isOffline} /> */}
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

const PlayerList = ({ players, totalPlayerCount, isOffline }) => {
	let first3 = players.slice(0, 3);
	let second3 = players.slice(3, 6);
	let third3 = players.slice(6, 9);
	return (
		<div className="mc-playerlist">
			<StatusText isOffline={isOffline} playerCount={totalPlayerCount} />
			<Row>
				<PlayerColumn players={first3} />
				<PlayerColumn players={second3}  />
				<PlayerColumn players={third3} className="d-none d-xl-block" />
			</Row>
		</div>
	);
};

const PlayerColumn = ({ players, className }) => {
	return (
		<Col className={className}>
			{players.map((playerName) => (
				<p key={playerName} className="my-1 pl-4">
					&middot;&nbsp;{playerName}
				</p>
			))}
		</Col>
	);
};

const StatusText = ({ isOffline, playerCount }) => {
	return (
		<h4 className="ml-2 pt-2">
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
