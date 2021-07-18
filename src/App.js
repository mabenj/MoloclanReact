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
import NotFound from "./pages/NotFound";
import ReactGA from "react-ga";
import MainContainer from "./components/MainContainer";

import "./styles/styles.scss";

// Regular
import { faBuilding, faCopy } from "@fortawesome/free-regular-svg-icons";
// Solid
import {
	faHandHoldingUsd,
	faBars,
	faExternalLinkAlt,
	faUser,
	faDownload
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
	faExternalLinkAlt,
	faUser,
	faDownload
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
