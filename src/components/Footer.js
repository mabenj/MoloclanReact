import React from "react";
import GoogleMap from "./GoogleMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";

export default function Footer() {
	return (
		<footer className="footer-main">
			<div className="container p-4">
				<Row>
					<Col md>
						<h4 className="text-white pb-2">
							Pääkonttori&nbsp;
							<FontAwesomeIcon icon={["far", "building"]} />
						</h4>
						<address>
							<ul className="list-unstyled">
								<li className="text-white">Paska-avenue 42</li>
								<li className="text-white">Karstula, 43 500 </li>
								<li className="text-white mb-2">Suomi, Finland</li>
								<li className="text-white">info@moloclan.fi</li>
								<li className="text-white">+358 420 609 000</li>
							</ul>
						</address>
					</Col>
					<Col md>
						<h4 className="text-white pb-2">
							Sivubisnekset&nbsp;
							<FontAwesomeIcon icon="hand-holding-usd" />
						</h4>
						<ul className="list-unstyled">
							<li className="text-white">
								<i>Emoyhtiö &middot; </i>
								<a
									href="https://www.youtube.com/watch?v=9V17W0uaZBI"
									target="_blank"
									rel="noreferrer">
									Markkinarako Oy
								</a>
							</li>
							<li className="text-white">
								<i>Jaridomain &middot; </i>
								<a
									href="https://jariclub.moloclan.fi"
									target="_blank"
									rel="noreferrer">
									Jari-Club
								</a>
							</li>
							<li className="text-white">
								<i>Vanhat sivut &middot; </i>
								<a
									href="https://old.moloclan.fi"
									target="_blank"
									rel="noreferrer">
									old.moloclan.fi
								</a>
							</li>
						</ul>
					</Col>
					<Col md>
						<GoogleMap />
					</Col>
				</Row>
				<Row>
					<Col className="text-white text-center mt-5">
						<i>Copyright &copy; Markkinarako Oy™ {new Date().getFullYear()}</i>
						<br />
						<i style={{ color: "gray" }}>
							Oranssi ukko -taustakuva ja Roof cämpperi -kuva by{" "}
							<a
								href="https://www.reddit.com/user/veys_ryu"
								target="_blank"
								rel="noreferrer">
								veys_ryu
							</a>
						</i>
					</Col>
				</Row>
			</div>
		</footer>
	);
}
