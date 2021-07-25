import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import Gallery from "./pages/Gallery";
import Servers from "./pages/Servers";
import Jari from "./pages/Jari";
import Home from "./pages/Home";
import GuiPack from "./pages/GuiPack";
import NotFound from "./pages/NotFound";
import MainContainer from "./components/MainContainer";
import ScrollToTop from "./components/Navigation/ScrollToTop";
import useDocumentTitle from "./hooks/useDocumentTitle";
import { initializeGA, withTracker } from "./analyticsTracker";

import "./styles/styles.scss";

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
	faCaretDown
} from "@fortawesome/free-solid-svg-icons";
// Brands
import {
	faTeamspeak,
	faDiscord,
	faSkype
} from "@fortawesome/free-brands-svg-icons";
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
	faCaretDown
);

const pageDefinitions = [
	{
		component: GuiPack,
		path: "/gui-pack",
		title: "MOLO - GUI pack"
	},
	{
		component: Gallery,
		path: "/galleria",
		title: "MOLO - Galleria"
	},
	{
		component: Servers,
		path: "/servut",
		title: "MOLO - Servut"
	},
	{
		component: Jari,
		path: "/jari",
		title: "MOLO - Jari Avanto"
	},
	{
		component: Home,
		path: "/home",
		title: "MOLO"
	},
	{
		component: Home,
		path: "/",
		title: "MOLO",
		exact: true
	},
	{
		component: NotFound,
		path: "*",
		title: "MOLO - 404"
	}
];

initializeGA(process.env.REACT_APP_GA_TRACKING_ID);

function App() {
	return (
		<>
			<Router>
				{/* Scrolls to top when page changes */}
				<ScrollToTop />
				<Header />
				<MainContainer>
					<Switch>
						{pageDefinitions.map(({ path, exact, component, title }) => (
							<Route
								key={path}
								path={path}
								exact={exact}
								render={(props) => (
									<Page {...props} component={component} title={title} />
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

const Page = ({ title, component }) => {
	useDocumentTitle(title);
	return component();
};

export default withTracker(App);
