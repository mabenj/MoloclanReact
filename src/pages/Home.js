import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const mainStyle = {
	//height: "100vh"
};

export default function Home() {
	return (
		<>
			<main style={mainStyle}>
				<Container fluid="md">
					<div className="wrapper text-justify">
						{/* cSpell: disable */}
						<p>
							MOLO on noin vuonna 2015 alkunsa saanut Rust-klaani. Pian
							perustamisen jälkeen klaani keräsi itselleen hyvinkin laajan
							pelaajakunnan (lue <em>zerg</em>) ja sen myötä kusipäisen klaanin
							maineen useimmilla palvelimilla, joilla he pelasivat. Kyseistä
							mainetta vahvisti muihin pelaajiin kohdistuva häikäilemätön
							<em> fleimaaminen</em> sekä lukuisat <em>offline-raid</em>
							-tyyppiset iskut, joista klaani parhaiten tunnettiin.
						</p>
						<p>
							Muita MOLO-klaanin signatuurimanöövereitä olivat muun muassa
							Kemisti Kergen viljelemät <em>Lazy Dick</em> -raidtornit, loottien
							piilottaminen <em>cupboard</em>-komeroihin, ylenpalttinen servulla
							päivystäminen sekä yleinen härvääminen palvelimen chatissa.
							Klaanin pelaajakunnan krooninen työttömyys mahdollisti myös kellon
							ympäri pelaamisen ja sen myötä aamuyön pikkutunneille sijoittuvien{" "}
							<em>offline</em>-raidien järjestämisen.
						</p>
						<img
							class="rounded mx-auto my-5"
							style={{ display: "block" }}
							src="https://i.imgur.com/qT3VtMt.jpg"
							alt="molo offline raid"
						/>
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
						{/* cSpell: enable */}
					</div>
				</Container>
			</main>
		</>
	);
}
