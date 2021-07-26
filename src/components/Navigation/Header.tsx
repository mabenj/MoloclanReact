import { HTMLAttributes, useState } from "react";
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chicken from "../Chicken";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import navLinkDefinitions from "./nav-link-definitions.json";

interface ILinkDefinition {
	to: string;
	displayName: string;
	exact?: boolean;
	subLinks: {
		displayName: string;
		hash: string;
	}[];
}

const linkDefinitions = navLinkDefinitions as ILinkDefinition[];

const Header: React.FC = () => {
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
};

const Navigation: React.FC = () => {
	return (
		<div className="navigation-bar-middle">
			<Brand className="navigation-brand" />
			<Links className="navigation-links d-none d-md-flex" />
			<Links className="navigation-links d-md-none flex-column" />
		</div>
	);
};

const Brand: React.FC<HTMLAttributes<any>> = ({ className }) => {
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

const Links: React.FC<HTMLAttributes<any>> = ({ className }) => {
	return (
		<Nav className={className}>
			{linkDefinitions.map((linkDefinition) => (
				<Link key={linkDefinition.to} {...linkDefinition} />
			))}
		</Nav>
	);
};

const Link: React.FC<ILinkDefinition> = ({
	exact,
	to,
	displayName,
	subLinks
}) => {
	const hasSubLinks = !!subLinks && subLinks.length > 0;
	return (
		<div className="dropdown">
			<NavLink
				exact={exact}
				to={to}
				className="navigation-link dropdown-button">
				<span className="navigation-link-text">{displayName}</span>

				{hasSubLinks ? (
					<FontAwesomeIcon
						className="navigation-link-caret"
						icon="caret-down"
					/>
				) : null}
			</NavLink>
			{hasSubLinks ? (
				<div className="dropdown-content">
					<ul className="list-unstyled">
						{subLinks.map(({ displayName, hash }) => (
							<li key={hash}>
								<HashLink to={`${to}#${hash}`}>{displayName}</HashLink>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

const NavbarMobile: React.FC<HTMLAttributes<any>> = ({ className }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Navbar
			expand="xl"
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

export default Header;
