import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { cloneDeep } from "../../Utils";

const SERVER_IP = "51.79.162.160";
const FAVICON_URL = `https://api.minetools.eu/favicon/${SERVER_IP}/25565`;
const FAVICON_URL_FALLBACK = "https://i.imgur.com/8XKJwE8.jpg";
const QUERY_URL = `https://api.minetools.eu/query/${SERVER_IP}/25565`;

const cardStyle = {
	backgroundImage: "url('https://i.imgur.com/UPLRrTB.jpg')",
	backgroundSize: "100%",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center top",
	width: "100%",
	minHeight: "400px",
	borderRadius: "10px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	overflow: "hidden",
	transition: "all 200ms ease"
};

let cardStyleZoomed = cloneDeep(cardStyle);
cardStyleZoomed = Object.assign(cardStyleZoomed, {
	backgroundSize: "110%",
	backgroundPosition: "50% -10%"
});

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
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		fetch(QUERY_URL)
			.then((response) => response.json())
			.then((data) => {
				setIsOffline(data.status === "ERR");
				setPlayers(data.Playerlist?.slice(0, 20) || []);
				setPlayerCount(data.Playerlist?.length || 0);
			})
			.catch(console.error);
	}, []);

	return (
		<div
			style={isHovering ? cardStyleZoomed : cardStyle}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			<span style={headerStyle}>
				<h4 className="ml-2" style={{ fontWeight: "700" }}>
					MOLOCRAFT
				</h4>
				<img
					style={favIconStyle}
					src={isOffline ? FAVICON_URL_FALLBACK : FAVICON_URL}
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
							<span className="align-bottom">Paikalla&nbsp;</span>
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
		<Col sm>
			{players.map((playerName, index) => (
				<p key={index} className="my-1 pl-4">
					&middot;&nbsp;{playerName}
				</p>
			))}
		</Col>
	);
};
