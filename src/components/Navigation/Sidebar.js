import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import WeatherWidget from "../WeatherWidget";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = (e) => {
		setIsOpen((prev) => !prev);
		const sidebar = document.querySelector(".sidebar-content");
		sidebar.style.width = isOpen ? 0 : "20%";
	};

	return (
		<div className="sidebar">
			<div
				className=""
				style={{
					display: "flex",
					alignItems: "center"
				}}>
				<button
					className="hamburger-icon"
					onClick={toggleSidebar}
					style={{ zIndex: 2 }}>
					<FontAwesomeIcon icon="bars" />
				</button>
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
