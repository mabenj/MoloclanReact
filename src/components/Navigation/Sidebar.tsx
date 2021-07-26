import { HTMLAttributes, useState } from "react";
import { NavLink } from "react-router-dom";
import WeatherWidget from "../WeatherWidget";
import { HamburgerButton, CloseButton } from "../Buttons";
import { animateCSS } from "../../Utils";

import sidebarLinkDefinitions from "./sidebar-link-definitions.json";

interface ISidebarLink {
	displayName: string;
	pathname: string;
	target?: "_blank" | "_self";
}

const sidebarItems = sidebarLinkDefinitions as ISidebarLink[];

const openButtonId = "sidebar-open-btn";
const closeButtonId = "sidebar-close-btn";

const Sidebar: React.FC<HTMLAttributes<any>> = ({ className }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openSidebar: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
		setIsOpen(true);
		document.querySelector<HTMLDivElement>(".sidebar-content")!.style.width =
			"20%";
		animateCSS(`#${closeButtonId}`, "flipInY");
	};

	const closeSidebar: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
		setIsOpen(false);
		document.querySelector<HTMLDivElement>(".sidebar-content")!.style.width =
			"0px";
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
			<SidebarContent links={sidebarItems} />
		</div>
	);
};

interface ISidebarContent {
	links: ISidebarLink[];
}

const SidebarContent: React.FC<ISidebarContent> = ({ links }) => {
	return (
		<div className="sidebar-content" style={{ position: "fixed", zIndex: 1 }}>
			<ul className="mt-5">
				<li>
					<span>Proggikset</span>
				</li>
				{links.map(({ displayName, pathname, target = "_self" }) => (
					<li key={pathname}>
						<NavLink
							to={{ pathname }}
							className="hvr-bounce-to-right navigation-link"
							target={target}
							rel="noreferrer">
							{displayName}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;