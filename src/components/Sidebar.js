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
		<div className="sidebar">
			<button className="hamburger-icon" onClick={toggleSidebar}>
				<FontAwesomeIcon icon="bars" />
			</button>
			<SidebarContent header="Proggikset" />
		</div>
	);
}

const SidebarContent = ({ header }) => {
	return (
		<div className="sidebar-content">
			<ul>
				<li>
					<span>{header}</span>
				</li>
				<li>
					<Link to="/gui-pack" className="hvr-bounce-to-right">
						Minecraft GUI Pack
					</Link>
				</li>
				<li>
					<a
						href="https://jariclub.moloclan.fi/"
						target="_blank"
						rel="noreferrer"
						className="hvr-bounce-to-right">
						Jari Club nettidomain
					</a>
				</li>
				<li>
					<a
						href="https://old.moloclan.fi/"
						target="_blank"
						rel="noreferrer"
						className="hvr-bounce-to-right">
						Vanha moloclan.fi
					</a>
				</li>
			</ul>
		</div>
	);
};
