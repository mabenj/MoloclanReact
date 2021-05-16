import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Servers from "./pages/Servers";
import Jari from "./pages/Jari";
import Home from "./pages/Home";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<Router>
				<Header />
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
			</Router>
			<Footer />
		</>
	);
}

export default App;
