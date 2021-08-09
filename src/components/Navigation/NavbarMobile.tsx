import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CloseButton, HamburgerButton } from "../Buttons";
import { animateCSS } from "../../Utils";
import { ILinkDefinition } from "./Header";

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
					<MobileDropdown links={links} onClick={() => setIsOpen(false)} />
				) : null}
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
	links,
	onClick
}: {
	links: ILinkDefinition[];
	onClick: () => void;
}) => {
	return (
		<div className="d-flex flex-column w-100">
			{links.map((link, i) => (
				<MobileNavLink
					key={link.displayName}
					onClick={onClick}
					link={link}
					isFirst={i === 0}
				/>
			))}
		</div>
	);
};

const MobileNavLink = ({
	link,
	onClick,
	key,
	isFirst
}: {
	link: ILinkDefinition;
	onClick: () => void;
	isFirst: boolean;
	key?: any;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const hasSubLinks = link.subLinks && link.subLinks.length > 0;

	const linkHeaderStyle: React.CSSProperties = {
		borderLeft: "2px solid hsl(36, 100%, 55%)"
	};

	return (
		<span
			className="pl-5"
			style={{
				borderBottom: "1px solid hsl(0, 0%, 67%)",
				borderTop: isFirst ? "1px solid hsl(0, 0%, 67%)" : undefined
			}}>
			<span
				key={key}
				className="text-color w-100 d-flex justify-content-between align-items-center">
				<NavLink
					exact={link.exact}
					to={link.to}
					className="text-color py-4 w-75"
					onClick={onClick}>
					<h5 className="px-3 py-0 my-0 d-inline-block" style={linkHeaderStyle}>
						{link.displayName}
					</h5>
				</NavLink>
				{hasSubLinks ? (
					<div className="p-4 w-25" onClick={() => setIsOpen((prev) => !prev)}>
						<FontAwesomeIcon
							icon={`angle-${isOpen ? "up" : "down"}`}
							style={{
								fontSize: "1.8rem"
							}}
						/>
					</div>
				) : null}
			</span>
			{hasSubLinks && isOpen ? (
				<ul className="list-unstyled" onClick={onClick}>
					{link.subLinks.map((subLink) => (
						<li key={subLink.hash} className="pl-3 py-3">
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
