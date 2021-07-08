import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import GallerySection from "../components/GallerySection";
import RustImagesJson from "../img/GalleryMedias/gallery-rust-sources.json";
import PhotoshopImagesJson from "../img/GalleryMedias/gallery-photoshop-sources.json";
import ScreenshotImagesJson from "../img/GalleryMedias/gallery-screenshots-sources.json";
import MiscJson from "../img/GalleryMedias/gallery-misc-sources.json";

const headerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
};

export default function Galleria({ documentTitle }) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return (
		<>
			<Wrapper>
				<div style={headerStyle}>
					<h1 className="border-0">Galleria</h1>
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
			</Wrapper>
			{sections.map((section) => (
				<Wrapper>
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

const sections = [
	{
		displayName: "Rust-perseilyt",
		id: "rust",
		media: RustImagesJson,
		direction: "row"
	},
	{
		displayName: "Paint-teokset",
		id: "paint",
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
		id: "misc",
		media: MiscJson,
		direction: "column"
	}
];
