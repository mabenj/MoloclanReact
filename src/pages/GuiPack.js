import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageSources from "../img/MediaSources/gui-pack-images-sources.json";
import GallerySection from "../components/GallerySection";

const DL_LINK =
	"https://drive.google.com/uc?export=download&id=1XtGaMgX7xDzrKSGYGvLHWIMSIVJZHdBs";

const GuiPackIcon = () => {
	return (
		<img
			src="https://i.imgur.com/GQOoX1c.png"
			alt="GUI-pack icon"
			className="d-block mx-auto"
		/>
	);
};

export default function GuiPack({ documentTitle }) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return (
		<Wrapper>
			<h1>GUI-Pack</h1>
			<Row>
				<Col xs={9}>
					{/* cSpell: disable */}
					<p>
						GUI Pack on Minecraft-resurssipaketti. GUI Pack muuttaa ainoastaan
						pelin valikkojen, fonttien ja muun käyttöliittymän piirteitä. Ajatus{" "}
						<i>hentai</i>-tauluista ja -skineistä voidaan siis unohtaa.
					</p>
					<p>
						GUI Packin väsäämisestä on kulunut jo useampi vuosi, joten pelin
						uusimpien ja hienoimpien tekstuureiden kanssa saattaa mahdollisesti,
						ehkä jopa luultavasti tai kaiketi olla joitain
						yhteensopivuusongelmia,{" "}
						<span style={{ fontSize: "12px" }}>
							joista MOLO Gaming™ -organisaatio, sen toimihenkilöt saatikka
							tytäryhtiöt, kuten Markkinarako Oy eivät ole lakiteknisesti
							vastuussa.
						</span>
					</p>
				</Col>
				<Col>
					<GuiPackIcon />
				</Col>
			</Row>
			<Row className="mt-5">
				<Col>
					<h3>Asentaminen</h3>
					<ol>
						<li>
							Lataa <em>GUI-Pack.zip</em>
						</li>
						<li>Käynnistä mine</li>
						<li>Avaa "Options"</li>
						<li>
							Avaa <em>Resource packs</em>, jonka jälkeen paina{" "}
							<em>Open Pack Folder</em>
						</li>
						<li>
							Nyt <em>resourcepacks</em> -nimisen kansion pitäisi (l)aueta
							<sup> :D</sup> ruutuun
						</li>
						<li>
							Poista <code>C:\Windows\System32</code> -kansio
						</li>
						<li>
							Siirrä ladattu .zip-tiedosto juuri avautuneseen{" "}
							<em>resource packs</em>
							-kansioon
						</li>
						<li>
							Jos omaat lukihäiriön tai olet muuten vain hieman hidas päästäsi,
							voit lukea tarkemmat ohjeet{" "}
							<a
								href="https://minecraft.fandom.com/fi/wiki/Tekstuuripaketit#Tekstuuripaketin_asentaminen"
								target="_blank"
								rel="noreferrer">
								tästä
							</a>
						</li>
					</ol>
					{/* cSpell: enable */}
				</Col>
			</Row>
			<Row className="mt-2">
				<Col>
					<Button variant="warning" href={DL_LINK} download>
						<FontAwesomeIcon icon="download" />
						&nbsp;&nbsp;Lataa
					</Button>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col>
					<GallerySection
						header="Kuvii"
						id="images"
						media={ImageSources}
						direction="row"
						thumbnailSize="huge"
					/>
				</Col>
			</Row>
		</Wrapper>
	);
}
