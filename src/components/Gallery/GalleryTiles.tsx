import Gallery, {
	PhotoClickHandler,
	RenderImageProps,
	PhotoProps
} from "react-photo-gallery";
import MediaComponent, { IMediaComponentProps } from "./MediaComponent";
import IExternalMediaSource from "../../MediaSources/IExternalMediaSource";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
	getImgurUrl,
	getYoutubeThumbnailUrl,
	getYoutubeUrl
} from "../../Utils";
import { useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

const THUMBNAILS: { [key: string]: string } = {
	small: "t",
	medium: "m",
	large: "l",
	huge: "h"
};

interface IGalleryTilesProps {
	sourceImages: IExternalMediaSource[];
	onClick: PhotoClickHandler<{}>;
	direction: "row" | "column";
	thumbnailSize: "small" | "medium" | "large" | "huge";
	youtubeAsIframe?: boolean;
	onLoad: () => void;
}

const GalleryTiles = ({
	sourceImages,
	onClick,
	direction,
	thumbnailSize,
	youtubeAsIframe = true,
	onLoad
}: IGalleryTilesProps) => {
	const { width: windowWidth } = useWindowDimensions();
	const isMobile = windowWidth < MOBILE_BREAKPOINT;

	useEffect(() => {
		setTimeout(onLoad, 50);
	}, [onLoad]);

	return (
		<Gallery
			photos={formatGalleryMedia(sourceImages, thumbnailSize, youtubeAsIframe)}
			margin={direction === "column" ? 10 : 3}
			renderImage={RenderImage}
			onClick={onClick}
			direction={direction}
			columns={isMobile ? 1 : 2}
		/>
	);
};

type CustomRenderImageProps = {
	id?: string;
	thumbnailSize?: "small" | "medium" | "large" | "huge";
	provider?: IMediaComponentProps["provider"];
	type?: IMediaComponentProps["type"];
	posterSrc?: string;
};

const RenderImage = <T extends CustomRenderImageProps>({
	margin,
	index,
	photo,
	onClick,
	direction,
	top,
	left
}: RenderImageProps<T>) => {
	const props: IMediaComponentProps = {
		src: photo.src,
		posterSrc: photo.posterSrc,
		desc: photo.alt || "",
		width: photo.width,
		height: photo.height,
		id: photo.id || photo.key || photo.src,
		provider: photo.provider || "imgur",
		type: photo.type || "jpg",
		onClick: (e) => onClick && onClick(e, { index }),
		direction: direction,
		thumbnailSize: photo.thumbnailSize,
		style: { margin, top, left }
	};
	return <MediaComponent key={photo.key} {...props} />;
};

const formatGalleryMedia = (
	mediaSources: IExternalMediaSource[],
	thumbnailSize: "small" | "medium" | "large" | "huge",
	youtubeAsIframe: boolean
): PhotoProps<CustomRenderImageProps>[] => {
	return mediaSources.map((media) => {
		let galleryPhoto: PhotoProps<CustomRenderImageProps> = {
			// CustomRenderImageProps
			id: media.id,
			thumbnailSize: thumbnailSize,
			provider: media.provider,
			type:
				media.provider === "youtube" && !youtubeAsIframe ? "jpg" : media.type,
			posterSrc: media.posterSrcId
				? getImgurUrl(media.posterSrcId, THUMBNAILS[thumbnailSize])
				: undefined,

			// PhotoProps
			src: "",
			width: media.width,
			height: media.height,
			alt: media.desc,
			key: media.id + media.desc
		};
		if (media.provider === "youtube") {
			if (youtubeAsIframe) {
				galleryPhoto.src = getYoutubeUrl(media.id);
			} else {
				galleryPhoto.src = getYoutubeThumbnailUrl(media.id);
				galleryPhoto.width = 480;
				galleryPhoto.height = 360;
			}
		} else if (media.type === "mp4") {
			galleryPhoto.src = getImgurUrl(media.id, "", ".mp4");
		} else {
			galleryPhoto.src = getImgurUrl(
				media.id,
				THUMBNAILS[thumbnailSize],
				media.type === "png" ? ".png" : ".jpg"
			);
		}
		return galleryPhoto;
	});
};

export default GalleryTiles;
