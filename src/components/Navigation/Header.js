import React, { useState } from "react";
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HamburgerButton } from "../Buttons";
import Chicken from "../Chicken";

const linkDefinitions = [
	{ to: "/", displayName: "MOLO", exact: true },
	{ to: "/servut", displayName: "SERVUT" },
	{ to: "/galleria", displayName: "GALLERIA" },
	{ to: "/jari", displayName: "JARI" }
];

export default function Header() {
	return (
		<>
			<NavbarMobile className="d-md-none" />
			<Row className="d-none d-md-flex fixed-top navigation-bar">
				<Col>
					<Sidebar className="d-none d-xl-block" />
				</Col>
				<Col md={9} xl={7}>
					<Navigation />
				</Col>
				<Col className="">
					<Chicken />
				</Col>
			</Row>
		</>
	);
}

const Navigation = () => {
	return (
		<div className="navigation-bar-middle">
			<Brand className="navigation-brand" />
			<Links className="navigation-links d-none d-md-flex" />
			<Links className="navigation-links d-md-none flex-column" />
		</div>
	);
};

const Brand = ({ className }) => {
	return (
		<Nav className={className}>
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
	);
};

const Links = ({ className }) => {
	return (
		<Nav className={className}>
			<HamburgerButton className="navigation-hamburger d-md-none" />
			{linkDefinitions.map((link) => (
				<NavLink
					exact={link.exact}
					to={link.to}
					className="navigation-link"
					key={link.to}>
					{link.displayName}
				</NavLink>
			))}
		</Nav>
	);
};

const NavbarMobile = ({ className }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Navbar
			expand="xxl"
			variant="dark"
			onToggle={() => setExpanded((prev) => !prev)}
			expanded={expanded}
			fixed="top"
			className={`navigation-bar-mobile ${className}`}>
			<Brand />
			<Nav>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav onClick={() => setExpanded(false)}>
						{linkDefinitions.map((link) => (
							<NavLink
								exact={link.exact}
								to={link.to}
								className="navigation-link"
								key={link.to}>
								{link.displayName}
							</NavLink>
						))}
					</Nav>
				</Navbar.Collapse>
			</Nav>
		</Navbar>
	);
};
