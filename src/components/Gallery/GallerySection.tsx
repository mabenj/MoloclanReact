import IExternalMediaSource from "../../img/MediaSources/IMediaSource";
import Lightbox from "./Lightbox";
import useLightbox from "../../hooks/useLightbox";
import GalleryTiles from "./GalleryTiles";

const USE_LIGHTBOX_VIDEO_PLAYER = false;

export interface IGallerySectionProps extends React.HTMLAttributes<any> {
	media: IExternalMediaSource[];
	direction?: "row" | "column";
	thumbnailSize?: "small" | "medium" | "large" | "huge";
	header?: string;
}

const GallerySection = ({
	media,
	direction = "row",
	thumbnailSize = "large",
	header,
	id
}: IGallerySectionProps) => {
	const [lightboxToggler, lightboxIndex, openLightbox] = useLightbox();

	return (
		<div className="mt-2" id={id}>
			{header ? <h3 className="mb-4">{header}</h3> : null}
			<GalleryTiles
				sourceImages={media}
				onClick={(_, { index }) => openLightbox(index)}
				direction={direction}
				thumbnailSize={thumbnailSize}
				youtubeAsIframe={!USE_LIGHTBOX_VIDEO_PLAYER}
			/>
			<Lightbox
				toggler={lightboxToggler}
				index={lightboxIndex}
				sourceMedias={media}
				enableCustomSources={USE_LIGHTBOX_VIDEO_PLAYER}
			/>
		</div>
	);
};

export default GallerySection;
