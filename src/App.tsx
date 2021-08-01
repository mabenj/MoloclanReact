import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import MainContainer from "./components/MainContainer";
import Page, { PAGE_DEFINITIONS } from "./pages/Page";

import "./styles/styles.scss";

////////////////////////// ICONS START //////////////////////////////////////
// Regular
import { faBuilding, faCopy } from "@fortawesome/free-regular-svg-icons";
// Solid
import {
	faHandHoldingUsd,
	faBars,
	faExternalLinkAlt,
	faUser,
	faDownload,
	faCheckCircle,
	faTimesCircle,
	faPoop,
	faDrumstickBite,
	faSave,
	faTimes,
	faCaretDown,
	faCubes
} from "@fortawesome/free-solid-svg-icons";
// Brands
import {
	faTeamspeak,
	faDiscord,
	faSkype
} from "@fortawesome/free-brands-svg-icons";
// Custom
import { facMinecraft } from "./CustomFontAwesomeIcons";
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
	faDownload,
	faCheckCircle,
	faTimesCircle,
	faPoop,
	faSkype,
	faDrumstickBite,
	faSave,
	faTimes,
	faCaretDown,
	faCubes,
	facMinecraft
);
////////////////////////// ICONS END //////////////////////////////////////

function App() {
	return (
		<>
			<Router>
				<Header />
				<MainContainer>
					<Switch>
						{PAGE_DEFINITIONS.map(({ path, exact, component, title }) => (
							<Route
								key={path}
								path={path}
								exact={exact}
								render={() => (
									<Page key={Math.random()} title={title}>
										{component}
									</Page>
								)}
							/>
						))}
					</Switch>
				</MainContainer>
			</Router>
			<Footer />
		</>
	);
}

export default App;
