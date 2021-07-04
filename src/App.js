import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Servers from "./pages/Servers";
import Jari from "./pages/Jari";
import Home from "./pages/Home";
import GuiPack from "./pages/GuiPack";
import { Container } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Regular
import { faBuilding, faCopy } from "@fortawesome/free-regular-svg-icons";
// Solid
import { faHandHoldingUsd, faBars } from "@fortawesome/free-solid-svg-icons";
// Brands
import { faTeamspeak, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
	faBuilding,
	faHandHoldingUsd,
	faTeamspeak,
	faDiscord,
	faCopy,
	faBars
);

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Container fluid="md">
						<Switch>
							<Route path="/gui-pack">
								<GuiPack></GuiPack>
							</Route>
							<Route path="/galleria">
								<Gallery></Gallery>
							</Route>
							<Route path="/servut">
								<Servers></Servers>
							</Route>
							<Route path="/jari">
								<Jari></Jari>
							</Route>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</Container>
				</main>
			</Router>
			<Footer />
		</>
	);
}

export default App;
