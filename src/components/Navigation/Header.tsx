import { useState } from "react";
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chicken from "../Chicken";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import navLinkDefinitions from "./nav-link-definitions.json";
import { CloseButton, HamburgerButton } from "../Buttons";
import { animateCSS } from "../../Utils";

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

const Header = () => {
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

const Navigation = () => {
	return (
		<div className="navigation-bar-middle">
			<Brand className="navigation-brand" />
			<Links className="navigation-links d-none d-md-flex" />
			<Links className="navigation-links d-md-none flex-column" />
		</div>
	);
};

const Brand = ({ className }: { className?: string }) => {
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

const Links = ({ className }: { className: string }) => {
	return (
		<Nav className={className}>
			{linkDefinitions.map((linkDefinition) => (
				<Link key={linkDefinition.to} {...linkDefinition} />
			))}
		</Nav>
	);
};

const Link = ({ exact, to, displayName, subLinks }: ILinkDefinition) => {
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
						{subLinks.map(({ displayName, hash }, index) => (
							<li key={hash} className="hvr-bounce-to-right">
								<HashLink
									to={`${to}#${hash}`}
									className={index !== 0 ? "" : `first`}>
									{displayName}
								</HashLink>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

const NavbarMobile = ({ className }: { className: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div
				className={`d-flex flex-column d-md-none fixed-top nav-bar-mobile nav-bar-mobile-${
					isOpen ? "opened" : "closed"
				}`}>
				<MobileHead
					isOpen={isOpen}
					setOpen={() => setIsOpen(true)}
					setClosed={() => setIsOpen(false)}
				/>
				{isOpen ? <MobileDropdown linkDefinitions={linkDefinitions} /> : null}
			</div>
		</>
	);
};

const MobileHead = ({
	isOpen,
	setOpen,
	setClosed
}: {
	isOpen: boolean;
	setOpen: () => void;
	setClosed: () => void;
}) => {
	const openButtonId = "navbar-open-btn";
	const closeButtonId = "navbar-close-btn";

	const openNavbar = () => {
		setOpen();
		animateCSS(`#${closeButtonId}`, "flipInY");
	};

	const closeNavBar = () => {
		setClosed();
		animateCSS(`#${openButtonId}`, "flipInY");
	};
	return (
		<div className="w-100 d-flex justify-content-between">
			<Brand className="navigation-brand ml-4" />
			<span className="mr-4">
				<HamburgerButton
					id={openButtonId}
					onClick={openNavbar}
					style={{ display: isOpen ? "none" : "block" }}
				/>
				<CloseButton
					id={closeButtonId}
					onClick={closeNavBar}
					style={{ display: isOpen ? "block" : "none" }}
				/>
			</span>
		</div>
	);
};

const MobileDropdown = ({
	linkDefinitions
}: {
	linkDefinitions: ILinkDefinition[];
}) => {
	return (
		<>
			{linkDefinitions.map((link) => (
				<p>{link.displayName}</p>
			))}
		</>
	);
};

export default Header;
