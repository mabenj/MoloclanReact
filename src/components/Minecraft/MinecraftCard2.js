import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const SERVER_IP = "51.79.162.160";
const FAVICON_URL = `https://api.minetools.eu/favicon/${SERVER_IP}/25565`;
const FAVICON_URL_FALLBACK = "https://i.imgur.com/8XKJwE8t.jpg";
const QUERY_URL = `https://api.minetools.eu/query/${SERVER_IP}/25565`;
const NUMBER_OF_PLAYERS_TO_TAKE = 20;
const BACKGROUND_SOURCE = "https://i.imgur.com/UPLRrTBh.jpg";
const HOVER_ZOOM_SCALE = 1.1;

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
	const container = {
		width: "100%",
		backgroundColor: "red",
		overflow: "hidden"
	};
	return (
		<div style={container} className="rounded">
			{children}
		</div>
	);
};

const BackgroundImage = () => {
	const [isHovering, setIsHovering] = useState(false);

	const style = {
		backgroundImage: `url('${BACKGROUND_SOURCE}')`,
		backgroundSize: "100%",
		backgroundRepeat: "no-repeat",
		width: "100%",
		height: "225px",
		transition: "all 200ms ease",
		transform: isHovering ? `scale(${HOVER_ZOOM_SCALE})` : "scale(1)"
	};

	return (
		<div style={{ overflow: "hidden" }}>
			<div
				style={style}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			/>
		</div>
	);
};

const Title = ({ isOffline }) => {
	const containerStyle = {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-end",
		position: "absolute",
		bottom: "0"
	};

	const favIconStyle = {
		width: "80px",
		backgroundColor: "white",
		border: "1px solid grey",
		borderRadius: "99999px",
		boxShadow: "5px 5px 20px grey",
		position: "relative",
		top: "20px",
		marginRight: "40px"
	};

	return (
		<span style={containerStyle}>
			<h4 className="ml-2" style={{ fontWeight: "700" }}>
				MOLOCRAFT
			</h4>
			<img
				style={favIconStyle}
				src={isOffline ? FAVICON_URL_FALLBACK : FAVICON_URL}
				alt="favicon"
			/>
		</span>
	);
};

const PlayerList = ({ players, totalPlayerCount, isOffline }) => {
	let first3 = players.splice(0, 3);
	let second3 = players.splice(3, 6);
	let third3 = players.splice(6, 9);
	first3 = ["pelaaja2", "dragonslayer99", "CocoCeellä"];
	second3 = ["Matti meikäläinen", "maken_mine_ukko", "Jarizari"];
	third3 = ["kettune1", "Gallex", "jaffaKola"];
	return (
		<Row style={{ backgroundColor: "gray" }}>
			<PlayerColumn players={first3} />
			<PlayerColumn players={second3} />
			<PlayerColumn players={third3} />
		</Row>
	);
};

const PlayerColumn = ({ players }) => {
	return (
		<Col sm>
			{players.map((playerName) => (
				<p key={playerName} className="my-1 pl-4">
					&middot;&nbsp;{playerName}
				</p>
			))}
		</Col>
	);
};

const StatusText = ({ isOffline, playerCount }) => {
	const style = {
		// position: "absolute",
		// bottom: 0
	};

	isOffline = false;

	return (
		<h4 className="ml-2 mt-2" style={style}>
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
