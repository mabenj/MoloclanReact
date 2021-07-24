import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import WeatherWidget from "../WeatherWidget";
import { HamburgerButton, CloseButton } from "../Buttons";
import { animateCSS } from "../../Utils";

const openButtonId = "sidebar-open-btn";
const closeButtonId = "sidebar-close-btn";

export default function Sidebar({ className }) {
	const [isOpen, setIsOpen] = useState(false);

	const openSidebar = (e) => {
		setIsOpen(true);
		document.querySelector(".sidebar-content").style.width = "20%";
		animateCSS(`#${closeButtonId}`, "flipInY");
	};

	const closeSidebar = (e) => {
		setIsOpen(false);
		document.querySelector(".sidebar-content").style.width = 0;
		animateCSS(`#${openButtonId}`, "flipInY");
	};

	return (
		<div className={`sidebar ${className}`}>
			<div
				className=""
				style={{
					display: "flex",
					alignItems: "center"
				}}>
				<HamburgerButton
					id={openButtonId}
					onClick={openSidebar}
					style={{ zIndex: 2, display: isOpen ? "none" : "block" }}
				/>
				<CloseButton
					id={closeButtonId}
					onClick={closeSidebar}
					style={{ zIndex: 2, display: isOpen ? "block" : "none" }}
				/>
				<WeatherWidget style={{ zIndex: 2 }} />
			</div>
			<SidebarContent header="Proggikset" />
		</div>
	);
}

const SidebarContent = ({ header }) => {
	return (
		<div className="sidebar-content" style={{ position: "fixed", zIndex: 1 }}>
			<ul className="mt-5">
				<li>
					<span>{header}</span>
				</li>
				{sidebarItems.map((item) => (
					<li key={item.to}>
						<NavLink
							to={item.to}
							className="hvr-bounce-to-right navigation-link"
							target={item.target}
							rel="noreferrer">
							{item.displayName}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

const sidebarItems = [
	{
		to: "/gui-pack",
		target: "",
		displayName: "Minecraft GUI Pack"
	},
	{
		to: { pathname: "https://jariclub.moloclan.fi/" },
		target: "_blank",
		displayName: "Jari Club nettidomain"
	},
	{
		to: { pathname: "https://old.moloclan.fi/" },
		target: "_blank",
		displayName: "Vanha moloclan.fi"
	}
];
