import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import GallerySection from "../components/GallerySection";
import RustImagesJson from "../img/gallery-rust-sources.json";

const headerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
};

const sections = [
	{
		displayName: "Rust-perseilyt",
		id: "rust",
		images: RustImagesJson
	},
	{ displayName: "Paint-teokset", id: "paint", images: [""] },
	{
		displayName: "8k Screenshotteja",
		id: "screenshots",
		images: [""]
	},
	{ displayName: "Kummallisuuksia", id: "misc", images: [""] }
];

export default function Galleria({ documentTitle }) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return (
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
			{sections.map((section) => (
				<GallerySection
					key={section.id}
					header={section.displayName}
					id={section.id}
					images={section.images}
				/>
			))}
		</Wrapper>
	);
}
