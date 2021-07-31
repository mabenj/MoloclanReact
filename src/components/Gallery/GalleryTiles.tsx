import Gallery, {
	PhotoClickHandler,
	RenderImageProps,
	PhotoProps
} from "react-photo-gallery";
import MediaComponent, { IMediaComponentProps } from "./MediaComponent";
import IExternalMediaSource from "../../MediaSources/IExternalMediaSource";
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
	id?: string;
	thumbnailSize?: "small" | "medium" | "large" | "huge";
	provider?: IMediaComponentProps["provider"];
	type?: IMediaComponentProps["type"];
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
	return <MediaComponent {...props} />;
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

			// PhotoProps
			src: "", // Will be determined in MediaComponent
			width: media.width,
			height: media.height,
			alt: media.desc,
			key: media.id
		};
		if (media.provider === "youtube" && !youtubeAsIframe) {
			galleryPhoto.width = 480;
			galleryPhoto.height = 360;
		}
		return galleryPhoto;
	});
};

export default GalleryTiles;
