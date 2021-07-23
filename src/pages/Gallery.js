import React from "react";
import Wrapper from "../components/Wrapper";
import GallerySection from "../components/GallerySection";
import RustImagesJson from "../img/MediaSources/gallery-rust-sources.json";
import PhotoshopImagesJson from "../img/MediaSources/gallery-photoshop-sources.json";
import ScreenshotImagesJson from "../img/MediaSources/gallery-screenshots-sources.json";
import MiscJson from "../img/MediaSources/gallery-misc-sources.json";
import { ListGroup } from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { scrollToElementSmooth } from "../Utils";
import { Button } from "react-bootstrap";

const headerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
};

export default function Gallery() {
	const { width } = useWindowDimensions();
	const isMobile = width < 768;
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
							<Button
								as="a"
								variant=""
								className="text-decoration-none orange-color orange-color-hover"
								onClick={() => scrollToElementSmooth(`#${section.id}`)}>
								{section.displayName}
							</Button>
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
						<Button
							as="a"
							variant=""
							className="text-decoration-none orange-color orange-color-hover"
							onClick={() => scrollToElementSmooth(`#${section.id}`)}>
							{section.displayName}
						</Button>
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
