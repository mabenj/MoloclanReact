import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CloseButton, HamburgerButton } from "../Buttons";
import { animateCSS } from "../../Utils";
import { ILinkDefinition } from "./Header";

import WeatherWidget from "../WeatherWidget";
import Chicken from "../Chicken";

const NavbarMobile = ({
	className,
	links
}: {
	className: string;
	links: ILinkDefinition[];
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div
				className={`${className} d-flex flex-column fixed-top nav-bar-mobile nav-bar-mobile-${
					isOpen ? "opened" : "closed"
				}`}>
				<MobileHead
					isOpen={isOpen}
					setOpen={() => setIsOpen(true)}
					setClosed={() => setIsOpen(false)}
				/>
				{isOpen ? (
					<>
						<MobileToolbar />
						<MobileDropdown
							links={links}
							handleClick={() => setIsOpen(false)}
						/>
					</>
				) : null}
			</div>
		</>
	);
};

const MobileToolbar = () => {
	return (
		<span className="w-100 px-4 py-2 d-flex justify-content-between">
			<WeatherWidget />
			<Chicken />
		</span>
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
		<div className={`nav-bar-mobile-head`}>
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
	links,
	handleClick
}: {
	links: ILinkDefinition[];
	handleClick: () => void;
}) => {
	return (
		<div className="d-flex flex-column w-100">
			{links.map((link) => (
				<MobileNavLink
					key={link.displayName}
					handleClick={handleClick}
					link={link}
				/>
			))}
		</div>
	);
};

const MobileNavLink = ({
	link,
	handleClick,
	key
}: {
	link: ILinkDefinition;
	handleClick: () => void;
	key?: any;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const hasSubLinks = link.subLinks && link.subLinks.length > 0;

	const linkHeaderStyle: React.CSSProperties = {
		borderLeft: "2px solid hsl(36, 100%, 55%)"
	};

	return (
		<span key={key} className="px-4">
			<span className="nav-bar-mobile-link">
				<span className="nav-bar-mobile-link-header">
					<NavLink
						exact={link.exact}
						to={{ pathname: link.to }}
						target={link.target}
						className={`py-4 pl-3 text-color w-${hasSubLinks ? "75" : "100"}`}
						onClick={handleClick}>
						<h5 className="px-2 d-inline-block" style={linkHeaderStyle}>
							{link.displayName}
						</h5>
					</NavLink>
					{hasSubLinks ? (
						<div
							className="py-4 pr-3 w-25"
							onClick={() => setIsOpen((prev) => !prev)}>
							<FontAwesomeIcon
								icon={`angle-${isOpen ? "up" : "down"}`}
								className="nav-bar-mobile-link-caret"
								pull="right"
							/>
						</div>
					) : null}
				</span>
				{hasSubLinks && isOpen ? (
					<ul className="list-unstyled" onClick={handleClick}>
						{link.subLinks?.map((subLink) => (
							<li key={subLink.hash} className="pl-4 py-3">
								<HashLink
									to={`${link.to}#${subLink.hash}`}
									className="text-color d-inline-block w-100">
									{subLink.displayName}
								</HashLink>
							</li>
						))}
					</ul>
				) : null}
			</span>
		</span>
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

export default NavbarMobile;
