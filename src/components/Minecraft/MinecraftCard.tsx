import { useState, useEffect, useRef } from "react";
import minecraftService, { IPlayer } from "../../services/minecraftService";
import { getImgurUrl } from "../../Utils";

import "../../styles/mc.scss";
import { BarLoader, ClipLoader } from "react-spinners";

const BG_IMAGE_ID = "gbizRgN";
const BG_IMAGE_TN = getImgurUrl(BG_IMAGE_ID, "h", ".png");

const FALLBACK_FAVICON = "https://i.imgur.com/8XKJwE8t.jpg";

const AVATAR_WIDTH = 40;
const PLAYERS_TO_TAKE = 12;

const MinecraftCard = () => {
	const [players, setPlayers] = useState<IPlayer[]>([]);
	const [playerCount, setPlayerCount] = useState(0);
	const [isOffline, setIsOffline] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [favIcon, setFavIcon] = useState(FALLBACK_FAVICON);

	useEffect(() => {
		async function fetchServerInfo(): Promise<void> {
			const { isOnline, players, playerCount, favIcon } =
				await minecraftService.getServerInfo(PLAYERS_TO_TAKE, AVATAR_WIDTH);
			setPlayers(players);
			setPlayerCount(playerCount);
			setIsOffline(!isOnline);
			setIsLoading(false);
			setFavIcon((prev) => favIcon || prev);
		}
		fetchServerInfo();
	}, []);

	return (
		<Container>
			<BackgroundContainer>
				<BackgroundImage />
				<Title favIcon={favIcon} isLoading={isLoading} />
			</BackgroundContainer>
			<PlayerList
				players={players}
				totalPlayerCount={playerCount}
				isOffline={isOffline}
				isLoading={isLoading}
			/>
		</Container>
	);
};

export default MinecraftCard;

const Container = ({ children }: { children?: React.ReactNode }) => {
	return <div children={children} className="rounded mc-container" />;
};

const BackgroundContainer = ({ children }: { children?: React.ReactNode }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
	};

	return (
		<div
			onClick={handleClick}
			children={children}
			className="mc-bg-container"></div>
	);
};

const BackgroundImage = () => {
	const bgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!bgRef.current) {
			return;
		}
		bgRef.current.style.backgroundImage = `url('${BG_IMAGE_TN}')`;
	}, [bgRef]);

	return <div ref={bgRef} className="mc-bg-image" />;
};

const Title = ({
	favIcon,
	isLoading
}: {
	favIcon: string;
	isLoading: boolean;
}) => {
	return (
		<span className={"mc-title"}>
			<h4 className="ml-2">MOLOCRAFT</h4>
			<div
				className="mc-fav-icon-container"
				style={{
					backgroundImage: `url('${favIcon}')`
				}}>
				<div className={`mc-fav-icon ${isLoading ? "mc-dark-bg" : ""}`}>
					<ClipLoader loading={isLoading} size={45} color="white" />
				</div>
			</div>
		</span>
	);
};

const PlayerList = ({
	players,
	totalPlayerCount,
	isOffline,
	isLoading
}: {
	players: IPlayer[];
	totalPlayerCount: number;
	isOffline: boolean;
	isLoading: boolean;
}) => {
	return (
		<div className="mc-playerlist">
			<div className="mc-playerlist-loader">
				<BarLoader loading={isLoading} color="white" width="100%" height={5} />
			</div>
			<StatusText
				isOffline={isOffline}
				playerCount={totalPlayerCount}
				className="mc-playerlist-status"
			/>
			<div className="mc-playerlist-players">
				{players.map(({ name, skinSource }) => (
					<span key={name} title={name}>
						<img src={skinSource} alt={name} width={AVATAR_WIDTH} />
						<p className="d-block text-break text-center">{name}</p>
					</span>
				))}
				{players.length === 0 && !isLoading && (
					<small className="text-muted">
						<em>Hiljast o...</em>
					</small>
				)}
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
