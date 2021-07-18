import { useState, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import Gallery from "./pages/Gallery";
import Servers from "./pages/Servers";
import Jari from "./pages/Jari";
import Home from "./pages/Home";
import GuiPack from "./pages/GuiPack";
import { Container } from "react-bootstrap";
import ReactGA, { set } from "react-ga";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";

// Regular
import { faBuilding, faCopy } from "@fortawesome/free-regular-svg-icons";
// Solid
import {
	faHandHoldingUsd,
	faBars,
	faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
// Brands
import { faTeamspeak, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
	faBuilding,
	faHandHoldingUsd,
	faTeamspeak,
	faDiscord,
	faCopy,
	faBars,
	faExternalLinkAlt
);

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
const history = createBrowserHistory();
history.listen((location) => {
	ReactGA.set({ page: location.pathname });
	ReactGA.pageview(location.pathname);
});

function App() {
	return (
		<>
			<Router history={history}>
				<Header />
				<MainContainer>
					<Switch>
						<Route path="/gui-pack">
							<GuiPack documentTitle="MOLO - GUI-Pack" />
						</Route>
						<Route path="/galleria">
							<Gallery documentTitle="MOLO - Galleria" />
						</Route>
						<Route path="/servut">
							<Servers documentTitle="MOLO - Servut" />
						</Route>
						<Route path="/jari">
							<Jari documentTitle="MOLO - Jari" />
						</Route>
						<Route path="/home">
							<Home />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</MainContainer>
			</Router>
			<Footer />
		</>
	);
}

export default App;

const MainContainer = (props) => {
	const [initialX, setInitialX] = useState(0);
	const [initialY, setInitialY] = useState(0);

	function handleScroll(e) {
		const bgOffsetY = -window.pageYOffset * 0.3;
		const newY = initialY + bgOffsetY;
		// console.log("initial: ", initialY);
		// console.log("offset: ", bgOffsetY);
		console.log(initialY);
		document.body.style.backgroundPosition = `${initialX}px ${newY}px`;
	}

	useEffect(() => {
		// TODO waitforelem
		const initialBgPosition = window.getComputedStyle(
			document.body
		).backgroundPosition;
		setInitialX(parseInt(initialBgPosition.split(" ")[0]));
		setInitialY(parseInt(initialBgPosition.split(" ")[1]));

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<main>
			<Container fluid="md">{props.children}</Container>
		</main>
	);
};
