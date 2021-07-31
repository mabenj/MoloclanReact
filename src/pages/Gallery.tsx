import Wrapper from "../components/Wrapper";
import GallerySection, {
	IGallerySectionProps
} from "../components/Gallery/GallerySection";
import { ListGroup } from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { scrollToElementSmooth } from "../Utils";
import { Button } from "react-bootstrap";

import IExternalMediaSource from "../MediaSources/IExternalMediaSource";
import rustImagesJson from "../MediaSources/gallery-rust-sources.json";
import photoshopImagesJson from "../MediaSources/gallery-photoshop-sources.json";
import screenshotImagesJson from "../MediaSources/gallery-screenshots-sources.json";
import videosJson from "../MediaSources/gallery-video-sources.json";

const rustMedia = rustImagesJson as IExternalMediaSource[];
const photoshopMedia = photoshopImagesJson as IExternalMediaSource[];
const screenshotsMedia = screenshotImagesJson as IExternalMediaSource[];
const videosMedia = videosJson as IExternalMediaSource[];

const headerStyle: React.CSSProperties = {
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
					<GallerySection {...section} />
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
								{section.header}
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
							{section.header}
						</Button>
					</ListGroup.Item>
				))}
			</ListGroup>
		</>
	);
};

const sections: IGallerySectionProps[] = [
	{
		header: "Rust-häröilyt",
		id: "rust",
		media: rustMedia,
		direction: "row"
	},
	{
		header: "Paint-teokset",
		id: "photoshop",
		media: photoshopMedia,
		direction: "row"
	},
	{
		header: "8k Screenshotteja",
		id: "screenshots",
		media: screenshotsMedia,
		direction: "row"
	},
	{
		header: "MOLO TV",
		id: "mtv",
		media: videosMedia,
		direction: "column"
	}
];
