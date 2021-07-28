import Gallery, {
	PhotoClickHandler,
	RenderImageProps,
	PhotoProps
} from "react-photo-gallery";
import {
	getImgurUrl,
	getYoutubeUrl,
	getYoutubeThumbnailUrl
} from "../../Utils";
import IExternalMediaSource from "../../img/MediaSources/IMediaSource";
// @ts-ignore //TODO
import Tilty from "react-tilty";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const MOBILE_BREAKPOINT = 768;

interface IGalleryTilesProps {
	sourceImages: IExternalMediaSource[];
	onClick: PhotoClickHandler<{}>;
	direction: "row" | "column";
	thumbnailSize: "small" | "medium" | "large" | "huge";
	youtubeAsIframe?: boolean;
}

const GalleryTiles = ({
	sourceImages,
	onClick,
	direction,
	thumbnailSize,
	youtubeAsIframe = true
}: IGalleryTilesProps) => {
	const { width: windowWidth } = useWindowDimensions();
	const isMobile = windowWidth < MOBILE_BREAKPOINT;

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
	useIframe?: boolean;
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
	const baseStyle: React.CSSProperties = {
		margin: margin,
		position: direction === "column" ? "absolute" : "initial",
		left: direction === "column" ? left : "initial",
		top: direction === "column" ? top : "initial"
	};
	const iFrameStyle: React.CSSProperties = Object.assign(
		{
			border: 0,
			width: photo.width,
			height: photo.height,
			margin: margin
		},
		baseStyle
	);

	if (photo.useIframe) {
		return (
			<iframe
				key={photo.key}
				src={photo.src}
				title={photo.alt}
				style={iFrameStyle}
				allowFullScreen
			/>
		);
	}
	return (
		<Tilty
			key={photo.key}
			max={25}
			perspective={1500}
			speed={1000}
			className="gallery-tilty"
			style={baseStyle}>
			<img
				src={photo.src}
				alt={photo.alt}
				width={photo.width}
				height={photo.height}
				onClick={(e) => onClick && onClick(e, { index })}
			/>
			<div className="gallery-tilty-inner rounded">{photo.alt}</div>
		</Tilty>
	);
};

const formatGalleryMedia = (
	mediaSources: IExternalMediaSource[],
	thumbnailSize: "small" | "medium" | "large" | "huge",
	youtubeAsIframe: boolean
): PhotoProps<CustomRenderImageProps>[] => {
	return mediaSources.map((media) => {
		let galleryPhoto: PhotoProps<CustomRenderImageProps> = {
			src: "",
			width: media.width,
			height: media.height,
			alt: media.desc,
			key: media.id,
			useIframe: media.type === "youtube" && youtubeAsIframe
		};
		if (media.type === "youtube" && !youtubeAsIframe) {
			galleryPhoto.src = getYoutubeThumbnailUrl(media.id);
			galleryPhoto.width = 480;
			galleryPhoto.height = 360;
		} else {
			galleryPhoto.src =
				media.type === "youtube"
					? getYoutubeUrl(media.id)
					: getImgurUrl(media.id, THUMBNAILS[thumbnailSize]);
		}
		return galleryPhoto;
	});
};

const THUMBNAILS: { [key: string]: string } = {
	small: "t",
	medium: "m",
	large: "l",
	huge: "h"
};

export default GalleryTiles;
