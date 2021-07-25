import { useState, useEffect } from "react";
import minecraftService from "../../services/minecraftService";

import "../../styles/mc.scss";

const AVATAR_WIDTH = 40;
const MAX_NUMBER_OF_PLAYERS_TO_TAKE = 12;

type Player = {
	name: string;
	skinSource: string;
};

type ServerInfo = {
	isOnline: boolean;
	players: Player[];
	playerCounts: Number;
	favIcon: string;
};

export default function MinecraftCard() {
	const [players, setPlayers] = useState<Player[]>([]);
	const [playerCount, setPlayerCount] = useState(0);
	const [isOffline, setIsOffline] = useState(false);
	const [favIcon, setFavIcon] = useState("");

	useEffect(() => {
		minecraftService
			.getServerInfo(MAX_NUMBER_OF_PLAYERS_TO_TAKE, AVATAR_WIDTH)
			// @ts-ignore //TODO
			.then(({ isOnline, players, playerCount, favIcon }: ServerInfo) => {
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

const Container: React.FC = ({ children }) => {
	return <div className="rounded mc-container">{children}</div>;
};

const BackgroundContainer: React.FC = ({ children }) => {
	return <div className="mc-bg-container">{children}</div>;
};

const BackgroundImage = () => {
	return <div className="mc-bg-image" />;
};

type TitleProps = {
	favIcon: string;
};

const Title = ({ favIcon }: TitleProps) => {
	return (
		<span className={"mc-title"}>
			<h4 className="ml-2">MOLOCRAFT</h4>
			<img className="mc-fav-icon" src={favIcon} alt="favicon" />
		</span>
	);
};

type PlayerListProps = {
	players: Player[];
	totalPlayerCount: Number;
	isOffline: boolean;
};

const PlayerList = ({
	players,
	totalPlayerCount,
	isOffline
}: PlayerListProps) => {
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

type StatusTextProps = {
	isOffline: boolean;
	playerCount: Number;
	className?: string;
};

const StatusText = ({ isOffline, playerCount, className }: StatusTextProps) => {
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
