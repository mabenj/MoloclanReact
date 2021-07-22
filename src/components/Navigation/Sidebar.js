import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import WeatherWidget from "../WeatherWidget";
import { HamburgerButton } from "../Buttons";

export default function Sidebar({ className }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = (e) => {
		setIsOpen((prev) => !prev);
		const sidebar = document.querySelector(".sidebar-content");
		sidebar.style.width = isOpen ? 0 : "20%";
	};

	return (
		<div className={`sidebar ${className}`}>
			<div
				className=""
				style={{
					display: "flex",
					alignItems: "center"
				}}>
				<HamburgerButton onClick={toggleSidebar} style={{ zIndex: 2 }} />
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
