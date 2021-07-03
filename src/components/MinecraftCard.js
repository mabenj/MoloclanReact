import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

const cardStyle = {
	backgroundImage: "url('https://i.imgur.com/UPLRrTB.jpg')",
	backgroundSize: "100%",
	backgroundRepeat: "no-repeat",
	width: "100%",
	minHeight: "400px",
	borderRadius: "10px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	overflow: "hidden"
};

const headerStyle = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "flex-end"
};

const footerStyle = {
	minHeight: "150px",
	width: "100%",
	backgroundColor: "white",
	borderRadius: "0 0 10px 10px",
	boxShadow: "0 0 30px black",
	color: "black"
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

export default function MinecraftCard() {
	const [players, setPlayers] = useState([]);
	const [playerCount, setPlayerCount] = useState(0);
	const [isOffline, setIsOffline] = useState(false);

	const serverIp = "51.79.162.160";
	const faviconUrl = `https://api.minetools.eu/favicon/${serverIp}/25565`;
	const fallBackFavIconUrl = "https://i.imgur.com/8XKJwE8.jpg";
	const queryUrl = `https://api.minetools.eu/query/${serverIp}/25565`;

	useEffect(() => {
		fetch(queryUrl)
			.then((response) => response.json())
			.then((data) => {
				setIsOffline(data.status === "ERR");
				setPlayers(data.Playerlist?.slice(0, 999) || []);
				setPlayerCount(data.Playerlist?.length || 0);
			})
			.catch(console.error);
	}, [queryUrl]);

	return (
		<div style={cardStyle}>
			<span style={headerStyle}>
				<h4 className="ml-2" style={{ fontWeight: "700" }}>
					MOLOCRAFT
				</h4>
				<img
					style={favIconStyle}
					src={isOffline ? fallBackFavIconUrl : faviconUrl}
					alt="favicon"
				/>
			</span>
			<div style={footerStyle}>
				<h4 className="ml-2 mt-2">
					{isOffline ? (
						<span className="badge badge-danger badge-pill">
							Servu on rikki tai jtn
						</span>
					) : (
						<>
							Paikalla&nbsp;
							<span className="badge badge-success badge-pill">
								{playerCount}
							</span>
						</>
					)}
				</h4>
				<Row>
					<PlayerColumn players={players.slice(0, 3)} />
					<PlayerColumn players={players.slice(3, 6)} />
					<PlayerColumn players={players.slice(6, 9)} />
				</Row>
			</div>
		</div>
	);
}

const PlayerColumn = ({ players }) => {
	return (
		<Col md>
			<ul className="m-0 p-0 mx-2" style={{ listStyleType: "none" }}>
				{players.map((playerName, index) => (
					<li key={index} className="my-1">
						&middot;&nbsp;{playerName}
					</li>
				))}
			</ul>
		</Col>
	);
};
