import useDocumentTitle from "../hooks/useDocumentTitle";
import usePageTracking from "../hooks/usePageTracking";
import useScrollToTop from "../hooks/useScrollToTop";
import Gallery from "./Gallery";
import Servers from "./Servers";
import Jari from "./Jari";
import Home from "./Home";
import GuiPack from "./GuiPack";
import NotFound from "./NotFound";
import React from "react";

const Page = ({
	title,
	children
}: {
	title: string;
	children: React.ReactNode;
}) => {
	useScrollToTop();
	usePageTracking();
	useDocumentTitle(title);
	return <>{children}</>;
};

interface IPageDefinition {
	component: React.ReactNode;
	path: string;
	title: string;
	exact?: boolean;
}

export const PAGE_DEFINITIONS: IPageDefinition[] = [
	{
		component: <GuiPack />,
		path: "/gui-pack",
		title: "MOLO - GUI pack"
	},
	{
		component: <Gallery />,
		path: "/galleria",
		title: "MOLO - Galleria"
	},
	{
		component: <Servers />,
		path: "/servut",
		title: "MOLO - Servut"
	},
	{
		component: <Jari />,
		path: "/jari",
		title: "MOLO - Jari Avanto"
	},
	{
		component: <Home />,
		path: "/home",
		title: "MOLO"
	},
	{
		component: <Home />,
		path: "/",
		title: "MOLO",
		exact: true
	},
	{
		component: <NotFound />,
		path: "*",
		title: "MOLO - 404"
	}
];

export default Page;
