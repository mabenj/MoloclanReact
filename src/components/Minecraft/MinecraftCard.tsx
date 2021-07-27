import { useState, useEffect } from "react";
import minecraftService, { IPlayer } from "../../services/minecraftService";

import "../../styles/mc.scss";

const AVATAR_WIDTH = 40;
const PLAYERS_TO_TAKE = 12;

const MinecraftCard = () => {
	const [players, setPlayers] = useState<IPlayer[]>([]);
	const [playerCount, setPlayerCount] = useState(0);
	const [isOffline, setIsOffline] = useState(false);
	const [favIcon, setFavIcon] = useState("");

	useEffect(() => {
		async function fetchServerInfo(): Promise<void> {
			const { isOnline, players, playerCount, favIcon } =
				await minecraftService.getServerInfo(PLAYERS_TO_TAKE, AVATAR_WIDTH);
			setPlayers(players);
			setPlayerCount(playerCount);
			setIsOffline(!isOnline);
			setFavIcon(favIcon);
		}
		fetchServerInfo();
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
};

export default MinecraftCard;

const Container = ({ children }: { children?: React.ReactNode }) => {
	return <div children={children} className="rounded mc-container"></div>;
};

const BackgroundContainer = ({ children }: { children?: React.ReactNode }) => {
	return <div children={children} className="mc-bg-container"></div>;
};

const BackgroundImage = () => {
	return <div className="mc-bg-image" />;
};

const Title = ({ favIcon }: { favIcon: string }) => {
	return (
		<span className={"mc-title"}>
			<h4 className="ml-2">MOLOCRAFT</h4>
			<img className="mc-fav-icon" src={favIcon} alt="favicon" />
		</span>
	);
};

const PlayerList = ({
	players,
	totalPlayerCount,
	isOffline
}: {
	players: IPlayer[];
	totalPlayerCount: number;
	isOffline: boolean;
}) => {
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

const StatusText = ({
	isOffline,
	playerCount,
	className
}: {
	isOffline: boolean;
	playerCount: number;
	className?: string;
}) => {
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
