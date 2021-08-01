import { useState, useRef, useEffect } from "react";
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

const Sidebar = ({ className }: { className: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: Event) {
			if (
				e.target instanceof HTMLElement &&
				!containerRef.current?.contains(e.target)
			) {
				closeSidebar();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [containerRef]);

	const openSidebar = () => {
		setIsOpen(true);
		document.querySelector<HTMLDivElement>(".sidebar-content")!.style.width =
			"20%";
		animateCSS(`#${closeButtonId}`, "flipInY");
	};

	const closeSidebar = () => {
		setIsOpen(false);
		document.querySelector<HTMLDivElement>(".sidebar-content")!.style.width =
			"0px";
		animateCSS(`#${openButtonId}`, "flipInY");
	};

	return (
		<div ref={containerRef} className={`sidebar ${className}`}>
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

const SidebarContent = ({ links }: { links: ISidebarLink[] }) => {
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
