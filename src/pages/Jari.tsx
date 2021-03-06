import { Row, Col } from "react-bootstrap";
import Wrapper from "../components/Wrapper";

export default function Jari() {
	return (
		<Wrapper>
			<Row>
				{/* cSpell: disable */}
				<Col>
					<h2>Jari Avanto</h2>
					<p className="lead">Mies, joka ei tunne kelloa</p>
					<p>
						Jari Avanto, <em>Manne</em>, Jarru, Jarppi, Jarrutin, Jurnutin,
						Nörnö, Nirnu, Jari-Matti Latvala, Jari Jarruraita – edellä
						lueteltuna vain muutama MOLO-klaanin kenties ikonisimman jäsenen
						lukuisista nimistä. Rakkaalla lapsella monta nimeä ja niin edelleen,
						mutta MOLO:n keskuudessa hänet tunnetaan yksinkertaisemmin Jarina.
					</p>
					<figure className="text-center jari-quote my-5">
						<blockquote className="blockquote">
							<i>Ei nimi miestä pahenna, ellei mies nimeä.</i>
						</blockquote>
						<figcaption className="blockquote-footer">
							Raumalainen ohikulkija,{" "}
							<cite title="Source Title">Syvärauman Pub 2016</cite>
						</figcaption>
					</figure>
				</Col>
			</Row>
			<Row style={{ display: "flex", flexDirection: "row-reverse" }}>
				<Col>
					<figure>
						<img
							className="rounded mx-auto"
							style={{ width: "100%" }}
							src="https://i.imgur.com/aYaF4gs.jpg"
							alt="jari avanto rust"
						/>
						<figcaption className="text-muted">Pantomiimiesitys</figcaption>
					</figure>
				</Col>
				<Col md>
					<p>
						Jari on erikoinen yksilö. Jarin mieltymyksiin lukeutuvat muun
						muasssa: eri valtioiden rajojen muotojen tutkiskelu, kananjauhelihan
						puolestapuhuminen sekä ainainen roastaamisen kohteeksi pyrkiminen.
					</p>
					<figure>
						<img
							className="rounded mx-auto"
							style={{ width: "95%" }}
							src="https://i.imgur.com/7Ah2eth.jpg"
							alt="jari avanto rust2"
						/>
						<figcaption className="text-muted">Keihäänheittoa</figcaption>
					</figure>
					<p>
						Jarin kommelluksista ja tempauksista on olemassa jos minkälaista
						tarinaa ja kansantarua. Niistä kuitenkin kenties legendaarisimmat
						ovat <em>League of Legendsin</em>{" "}
						<abbr
							title="jäbä osti kahet kengät :D"
							className="initialism text-lowercase">
							kenkäfiasko
						</abbr>{" "}
						ja mellakkakilven kanssa sekoilu ruotsalaisen Anomalyn striimissä.
						Lisää Jarista ja Jarin kohelluksista löydät Jarin{" "}
						<a
							href="https://jariclub.moloclan.fi/"
							target="_blank"
							rel="noreferrer">
							fanisivustolta
						</a>{" "}
						ja{" "}
						<a
							href="https://www.youtube.com/watch?v=9V17W0uaZBI"
							target="_blank"
							rel="noreferrer">
							YouTube-kanavalta
						</a>
						.
					</p>
				</Col>
			</Row>
		</Wrapper>
	);
}
