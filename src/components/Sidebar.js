import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = (e) => {
		setIsOpen((prev) => !prev);
		let sidebar = document.querySelector(".sidebar");
		sidebar.style.width = isOpen ? 0 : "20%";
	};

	return (
		<>
			<button className="hamburger-icon" onClick={toggleSidebar}>
				<FontAwesomeIcon icon="bars" />
			</button>
			<SidebarContent header="Proggikset" />
		</>
	);
}

const SidebarContent = ({ header }) => {
	return (
		<div className="sidebar">
			<ul>
				<li>
					<span>{header}</span>
				</li>
				<li>
					<Link to="/gui-pack">Minecraft GUI Pack</Link>
				</li>
				<li>
					<a
						href="https://jariclub.moloclan.fi/"
						target="_blank"
						rel="noreferrer">
						Jari Club nettidomain
					</a>
				</li>
				<li>
					<a href="https://old.moloclan.fi/" target="_blank" rel="noreferrer">
						Vanha moloclan.fi
					</a>
				</li>
			</ul>
		</div>
	);
};
