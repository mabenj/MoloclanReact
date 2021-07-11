import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MoloLogo from "../components/MoloLogo/MoloLogo";
import Wrapper from "../components/Wrapper";

const OfflineRaidMeme = () => (
	<img
		className="d-block rounded mx-auto my-5 front-page-image"
		src="https://i.imgur.com/qT3VtMt.jpg"
		alt="molo offline raid meme"
	/>
);

const RoofCampImage = () => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		}}>
		<figure>
			<img
				className="rounded front-page-image"
				width="400px"
				src="https://i.imgur.com/3WC3Ddp.jpg"
				alt="Roof camper by veys_ryu"
			/>
			<figcaption className="text-muted">
				{/* cSpell: disable */}
				Kala Harri wipen viimeineisenä päivänä <br />- heinäkuu 2016, väritetty
			</figcaption>
		</figure>
	</div>
);

export default function Home() {
	return (
		<>
			<MoloLogo />
			<Wrapper>
				<h1>MOLO Clan</h1>
				<br />
				<p>
					MOLO on noin vuonna 2015 alkunsa saanut Rust-klaani. Pian perustamisen
					jälkeen klaani keräsi itselleen hyvinkin laajan pelaajakunnan (lue{" "}
					<em>
						<abbr
							className="initialism text-lowercase"
							title="semmonen kauhee lauma videopelaajia">
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
				<OfflineRaidMeme />

				<Row>
					<Col lg>
						<p>
							Sittemmin klaani on lopettanut toimintansa Rustin parissa ja
							jatkaa häröilyä TeamSpeak-palvelimen puolella. Palvelimen
							IP-osoitteen löydät <Link to="/servut">SERVUT</Link>-sivulta.
						</p>
						<p>
							Osa klaanin jäsenistöstä on sittemmin jatkanut toimintaa
							perustamalla kehnoa menestystä nauttivan
							startup-markkinointiyrityksen nimeltään Markkinarako Oy. Yrityksen
							liikevaihto vuonna 2019 oli noin 5€ ja vuonna 2020 se oli
							vastaavasti noin 2,50€.
						</p>
					</Col>
					<Col lg>
						<RoofCampImage />
					</Col>
				</Row>
				{/* cSpell: enable */}
			</Wrapper>
		</>
	);
}
