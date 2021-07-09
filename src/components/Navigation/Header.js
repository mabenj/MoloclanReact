import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactGA from "react-ga";

export default function Header() {
	const location = useLocation();
	const activePath = location.pathname.toLowerCase();
	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);
	return (
		<Navbar className="navbar" variant="dark" expand="md" fixed="top">
			<Sidebar />
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
		</Navbar>
	);
}
