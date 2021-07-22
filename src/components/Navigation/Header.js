import React, { useEffect } from "react";
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactGA from "react-ga";

export default function Header() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);
	return (
		<Row className="fixed-top navigation-bar">
			<Col>
				<Sidebar />
			</Col>
			<Col xs={7}>
				<Navigation />
			</Col>
			<Col></Col>
		</Row>
	);
}

const Navigation = () => {
	return (
		<div className="navigation-bar-middle">
			<Nav>
				<NavLink to="/">
					<Navbar.Brand className="navbar-brand">
						<img
							src="/favicon-96x96.png"
							width="35"
							height="35"
							className="d-inline-block"
							alt="MOLO clan logo"
						/>{" "}
						molo
					</Navbar.Brand>
				</NavLink>
			</Nav>
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
