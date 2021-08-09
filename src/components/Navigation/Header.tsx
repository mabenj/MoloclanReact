import navLinkDefinitions from "./nav-link-definitions.json";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export interface ILinkDefinition {
	to: string;
	displayName: string;
	exact?: boolean;
	subLinks: {
		displayName: string;
		hash: string;
	}[];
}

const linkDefinitions = navLinkDefinitions as ILinkDefinition[];

const Header = () => {
	return (
		<>
			<NavbarMobile className="d-md-none" links={linkDefinitions} />
			<NavbarDesktop className="d-none d-md-flex" links={linkDefinitions} />
		</>
	);
};

export default Header;
