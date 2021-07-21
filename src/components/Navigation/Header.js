import React, { useEffect } from "react";
import { Row, Col, Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
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
		<Row className="fixed-top">
			<Col>
				<Sidebar />
			</Col>
			<Col xs={7}>
				<Navigation activePath={activePath} />
			</Col>
			<Col></Col>
		</Row>
		// <Navbar className="navbar" variant="dark" expand="md" fixed="top">
		// 	<Left />
		// 	<span style={styleOuter}>
		// 		<Container>
		// 			<Nav>
		// 				<Navbar.Brand href="/" className="navbar-brand">
		// 					<img
		// 						src="/favicon-96x96.png"
		// 						width="35"
		// 						height="35"
		// 						className="d-inline-block"
		// 						alt="MOLO clan logo"
		// 					/>{" "}
		// 					molo
		// 				</Navbar.Brand>
		// 			</Nav>
		// 			<Nav>
		// 				<Navbar.Toggle aria-controls="basic-navbar-nav" />
		// 				<Navbar.Collapse id="basic-navbar-nav">
		// 					<Nav activeKey={activePath}>
		// 						<Nav.Link href="/">MOLO</Nav.Link>
		// 						<Nav.Link href="/servut">SERVUT</Nav.Link>
		// 						<Nav.Link href="/galleria">GALLERIA</Nav.Link>
		// 						<Nav.Link href="/jari">JARI</Nav.Link>
		// 					</Nav>
		// 				</Navbar.Collapse>
		// 			</Nav>
		// 		</Container>
		// 	</span>
		// 	<Chicken />
		// </Navbar>
	);
}

const Navigation = ({ activePath }) => {
	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
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
			{/* <Nav activeKey={activePath}>
				<Nav.Link href="/">MOLO</Nav.Link>				
				<Nav.Link href="/servut">SERVUT</Nav.Link>
				<Nav.Link href="/galleria">GALLERIA</Nav.Link>
				<Nav.Link href="/jari">JARI</Nav.Link>{" "}
			</Nav> */}
			<div className="navigation-links">
				<NavLink exact to="/" className="navigation-link">
					MOLO
				</NavLink>
				<NavLink to="/servut" className="navigation-link">
					SERVUT
				</NavLink>
				<NavLink to="/galleria" className="navigation-link">
					GALLERIA
				</NavLink>
				<NavLink to="/jari" className="navigation-link">
					JARI
				</NavLink>
			</div>
		</div>
	);
};
