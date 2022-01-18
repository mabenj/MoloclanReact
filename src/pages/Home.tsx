import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MoloLogo from "../components/MoloLogo/MoloLogo";
import Wrapper from "../components/Wrapper";

export default function Home() {
	return (
		<>
			<MoloLogo />
			<Wrapper>
				<h1>MOLO Clan</h1>
				<p className="lead">Joukko keskittymishäiriöisiä pummeja</p>
				<p>
					MOLO on noin vuonna 2015 alkunsa saanut juutalais-kristillinen
					Rust-klaani. Pian perustamisen jälkeen klaani keräsi itselleen
					hyvinkin laajan pelaajakunnan (lue{" "}
					<em>
						<abbr
							className="initialism text-lowercase"
							title="lauma kiukkuisia videopelaajia">
							zerg
						</abbr>
					</em>
					) ja sen myötä kusipäisen klaanin maineen useimmilla palvelimilla,
					joilla he pelasivat. Kyseistä mainetta vahvisti muihin pelaajiin
					kohdistuva häikäilemätön
					<em> fleimaaminen</em> sekä lukuisat <em>offline-raid</em>
					-tyyppiset iskut, joista klaani parhaiten tunnettiin.
				</p>
				<p>
					Muita MOLO-klaanin signatuurimanöövereitä olivat muun muassa Kemisti
					Kergen viljelemät <em>Lazy Dick</em> -raidtornit, loottien
					piilottaminen <em>cupboard</em>-komeroihin, ylenpalttinen servulla
					päivystäminen sekä yleinen härvääminen palvelimen chatissa. Klaanin
					pelaajakunnan krooninen työttömyys mahdollisti myös kellon ympäri
					pelaamisen ja sen myötä aamuyön pikkutunneille sijoittuvien{" "}
					<em>offline</em>-raidien järjestämisen.
				</p>
				<FrontPageImage
					src="https://i.imgur.com/qT3VtMt.jpg"
					alt="molo offline raid meme"
					caption="Kuvituskuva offline-raidista"
					className="my-5"
				/>

				<Row>
					<Col lg>
						<p>
							Sittemmin klaani on lopettanut toimintansa Rustin parissa ja
							nykyään jatkaa häröilyä TeamSpeak-palvelimen puolella. Palvelimen
							IP-osoitteen löydät <Link to="/servut">SERVUT</Link>-sivulta.
						</p>
						<p>
							Osa klaanin jäsenistöstä on jatkanut toimintaa perustamalla kehnoa
							menestystä nauttivan startup-markkinointiyrityksen:
							<em> Markkinarako Oy</em>. Yrityksen liikevaihto vuonna 2019 oli
							noin 5€.
						</p>
					</Col>
					<Col lg={5}>
						<FrontPageImage
							src="https://i.imgur.com/3WC3Ddp.jpg"
							alt="Roof camper by veys_ryu"
							caption={
								<>
									Kala Harri wipen viimeineisenä päivänä <br />- heinäkuu 2016,
									väritetty
								</>
							}
						/>
					</Col>
				</Row>
				{/* cSpell: enable */}
			</Wrapper>
		</>
	);
}

const FrontPageImage = ({
	src,
	alt,
	caption,
	className
}: {
	src: string;
	alt: string;
	caption: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}
			className={className}>
			<figure>
				<img className="rounded" width="100%" src={src} alt={alt} />
				<figcaption className="text-muted">{caption}</figcaption>
			</figure>
		</div>
	);
};
