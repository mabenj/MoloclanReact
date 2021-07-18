import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import GallerySection from "../components/GallerySection";
import RustImagesJson from "../img/MediaSources/gallery-rust-sources.json";
import PhotoshopImagesJson from "../img/MediaSources/gallery-photoshop-sources.json";
import ScreenshotImagesJson from "../img/MediaSources/gallery-screenshots-sources.json";
import MiscJson from "../img/MediaSources/gallery-misc-sources.json";
import { ListGroup } from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";

const headerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
};

export default function Gallery({ documentTitle }) {
	const { width } = useWindowDimensions();
	const isMobile = width < 768;
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return (
		<>
			<Wrapper>{isMobile ? <MobileHeader /> : <DesktopHeader />}</Wrapper>
			{sections.map((section) => (
				<Wrapper key={section.id}>
					<GallerySection
						key={section.id}
						header={section.displayName}
						id={section.id}
						media={section.media}
						direction={section.direction}
					/>
				</Wrapper>
			))}
		</>
	);
}

const DesktopHeader = () => {
	return (
		<>
			<div style={headerStyle}>
				<h1 className="border-0 mb-4">Galleria</h1>
				<ul className="list-inline">
					{sections.map((section) => (
						<li key={section.id} className="list-inline-item px-3">
							<a className="text-decoration-none" href={"#" + section.id}>
								{section.displayName}
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

const MobileHeader = () => {
	return (
		<>
			{" "}
			<h1>Galleria</h1>
			<ListGroup variant="flush">
				{sections.map((section) => (
					<ListGroup.Item
						key={section.id}
						action
						className="gallery-section-list-item">
						<a href={"#" + section.id}>{section.displayName}</a>
					</ListGroup.Item>
				))}
			</ListGroup>
		</>
	);
};

const sections = [
	{
		displayName: "Rust-häröilyt",
		id: "rust",
		media: RustImagesJson,
		direction: "row"
	},
	{
		displayName: "Paint-teokset",
		id: "photoshop",
		media: PhotoshopImagesJson,
		direction: "row"
	},
	{
		displayName: "8k Screenshotteja",
		id: "screenshots",
		media: ScreenshotImagesJson,
		direction: "row"
	},
	{
		displayName: "Kummallisuuksia",
		id: "weird",
		media: MiscJson,
		direction: "column"
	}
];
