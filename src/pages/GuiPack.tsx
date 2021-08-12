import Wrapper from "../components/Wrapper";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageSources from "../MediaSources/gui-pack-images-sources.json";
import GallerySection from "../components/Gallery/GallerySection";
import IExternalMediaSource from "../MediaSources/IExternalMediaSource";

const images = imageSources as IExternalMediaSource[];

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

export default function GuiPack() {
	return (
		<Wrapper>
			<h1>GUI-Pack</h1>
			<Row>
				<Col md={9}>
					{/* cSpell: disable */}
					<p>
						GUI Pack on Minecraft-resurssipaketti. GUI Pack muuttaa ainoastaan
						pelin valikkojen, fonttien ja muun käyttöliittymän piirteitä. Ajatus{" "}
						<em>hentai</em>-tauluista ja -skineistä voidaan siis unohtaa.
					</p>
					<p>
						GUI Packin väsäämisestä on kulunut jo useampi vuosi, joten pelin
						uusimpien ja hienoimpien tekstuureiden kanssa saattaa mahdollisesti,
						ehkä jopa luultavasti tai kaiketi olla joitain
						yhteensopivuusongelmia,{" "}
						<small>
							joista MOLO Gaming™ -organisaatio, sen toimihenkilöt saatikka
							tytäryhtiöt, kuten Markkinarako Oy eivät ole lakiteknisesti
							vastuussa.
						</small>
					</p>
				</Col>
				<Col md={3}>
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
						<li>
							Avaa <em>Options</em>
						</li>
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
					<a className="btn btn-warning" href={DL_LINK} role="button" download>
						<FontAwesomeIcon icon="save" />
						&nbsp;&nbsp;Lataa
					</a>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col>
					<GallerySection
						id="images"
						media={images}
						direction="row"
						thumbnailSize="huge"
					/>
				</Col>
			</Row>
		</Wrapper>
	);
}
