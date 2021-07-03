import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Servers from "./pages/Servers";
import Jari from "./pages/Jari";
import Home from "./pages/Home";
import { Container } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { faBuilding, faCopy } from "@fortawesome/free-regular-svg-icons";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faTeamspeak, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faBuilding, faHandHoldingUsd, faTeamspeak, faDiscord, faCopy);

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Container fluid="md">
						<Switch>
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
