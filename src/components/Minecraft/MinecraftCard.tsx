import { useState, useEffect } from "react";
import minecraftService, { IPlayer } from "../../services/minecraftService";

import "../../styles/mc.scss";

const AVATAR_WIDTH = 40;
const PLAYERS_TO_TAKE = 12;

const MinecraftCard: React.FC = () => {
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

const Container: React.FC = (props) => {
	return <div {...props} className="rounded mc-container"></div>;
};

const BackgroundContainer: React.FC = (props) => {
	return <div {...props} className="mc-bg-container"></div>;
};

const BackgroundImage: React.FC = (props) => {
	return <div {...props} className="mc-bg-image" />;
};

interface ITitle {
	favIcon: string;
}

const Title: React.FC<ITitle> = ({ favIcon, ...props }) => {
	return (
		<span {...props} className={"mc-title"}>
			<h4 className="ml-2">MOLOCRAFT</h4>
			<img className="mc-fav-icon" src={favIcon} alt="favicon" />
		</span>
	);
};

interface IPlayerList {
	players: IPlayer[];
	totalPlayerCount: number;
	isOffline: boolean;
}

const PlayerList: React.FC<IPlayerList> = ({
	players,
	totalPlayerCount,
	isOffline,
	...props
}) => {
	return (
		<div {...props} className="mc-playerlist">
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

interface IStatusText {
	isOffline: boolean;
	playerCount: number;
	className?: string;
}

const StatusText: React.FC<IStatusText> = ({
	isOffline,
	playerCount,
	className
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
