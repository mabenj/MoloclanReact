import React, { useState, useEffect } from "react";
import minecraftService from "../../services/minecraftService";

import "../../styles/mc.scss";
const AVATAR_WIDTH = 40;
const MAX_NUMBER_OF_PLAYERS_TO_TAKE = 12;

export default function MinecraftCard() {
	const [players, setPlayers] = useState([{ name: "", skinSource: "" }]);
	const [playerCount, setPlayerCount] = useState(0);
	const [isOffline, setIsOffline] = useState(false);
	const [favIcon, setFavIcon] = useState("");

	useEffect(() => {
		minecraftService
			.getServerInfo(MAX_NUMBER_OF_PLAYERS_TO_TAKE, AVATAR_WIDTH)
			.then(({ isOnline, players, playerCount, favIcon }) => {
				setPlayers(players);
				setPlayerCount(playerCount);
				setIsOffline(!isOnline);
				setFavIcon(favIcon);
			});
	}, []);

	return (
		<Container>
			<BackgroundContainer>
				<BackgroundImage />
				<Title favIcon={favIcon} />
			</BackgroundContainer>
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

const BackgroundContainer = ({ children }) => {
	return <div className="mc-bg-container">{children}</div>;
};

const BackgroundImage = () => {
	return <div className="mc-bg-image" />;
};

const Title = ({ favIcon }) => {
	return (
		<span className={"mc-title"}>
			<h4 className="ml-2">MOLOCRAFT</h4>
			<img className="mc-fav-icon" src={favIcon} alt="favicon" />
		</span>
	);
};

const PlayerList = ({ players, totalPlayerCount, isOffline }) => {
	return (
		<div className="mc-playerlist">
			<StatusText
				isOffline={isOffline}
				playerCount={totalPlayerCount}
				className="mc-playerlist-status"
			/>
			<div className="mc-playerlist-players">
				{players.map(({ name, skinSource }) => (
					<span key={name} title={name}>
						<img src={skinSource} alt={name} width={AVATAR_WIDTH} />
						<p className="d-inline-block text-truncate">{name}</p>
					</span>
				))}
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
