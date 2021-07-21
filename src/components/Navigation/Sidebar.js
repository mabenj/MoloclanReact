import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import WeatherWidget from "../WeatherWidget";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = (e) => {
		setIsOpen((prev) => !prev);
		let sidebar = document.querySelector(".sidebar-content");
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
				<li>
					<NavLink to="/gui-pack" className="hvr-bounce-to-right">
						Minecraft GUI Pack
					</NavLink>
				</li>
				<li>
					<Nav.Link
						href="https://jariclub.moloclan.fi/"
						target="_blank"
						rel="noreferrer"
						className="hvr-bounce-to-right">
						Jari Club nettidomain
					</Nav.Link>
				</li>
				<li>
					<Nav.Link
						href="https://old.moloclan.fi/"
						target="_blank"
						rel="noreferrer"
						className="hvr-bounce-to-right">
						Vanha moloclan.fi
					</Nav.Link>
				</li>
			</ul>
		</div>
	);
};
