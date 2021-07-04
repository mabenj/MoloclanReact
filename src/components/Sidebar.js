import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = (e) => {
		setIsOpen((prev) => !prev);
		let sidebar = document.querySelector(".sidebar");
		sidebar.style.width = isOpen ? 0 : "20%";
	};

	return (
		<>
			<div className="hamburger-icon" onClick={toggleSidebar}>
				<FontAwesomeIcon icon="bars" />
			</div>
			<SidebarContent />
		</>
	);
}

const SidebarContent = () => {
	return <div className="sidebar"></div>;
};
