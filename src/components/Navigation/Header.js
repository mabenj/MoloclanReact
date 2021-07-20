import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactGA from "react-ga";
import WeatherWidget from "../WeatherWidget";
import Chicken from "../Chicken";

export default function Header() {
	const location = useLocation();
	const activePath = location.pathname.toLowerCase();
	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);

	const styleOuter = {
		width: "100%",
		display: "flex",
		justifyContent: "space-between"
	};
	return (
		<Navbar className="navbar" variant="dark" expand="md" fixed="top">
			<Sidebar />
			<span style={styleOuter}>
				<WeatherWidget />
				<Container>
					<Nav>
						<Navbar.Brand href="/" className="navbar-brand">
							<img
								src="/favicon-96x96.png"
								width="35"
								height="35"
								className="d-inline-block"
								alt="MOLO clan logo"
							/>{" "}
							molo
						</Navbar.Brand>
					</Nav>
					<Nav>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav activeKey={activePath}>
								<Nav.Link href="/">MOLO</Nav.Link>
								<Nav.Link href="/servut">SERVUT</Nav.Link>
								<Nav.Link href="/galleria">GALLERIA</Nav.Link>
								<Nav.Link href="/jari">JARI</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Nav>
				</Container>
			</span>
			<Chicken />
		</Navbar>
	);
}
