/* eslint-disable no-unused-vars */
import { useState } from "react";
import Gallery from "react-photo-gallery";
import FsLightbox from "fslightbox-react";
import { getImgurSpecialUrl } from "../../Utils";
import { isOpera, isEdge, isChrome, isChromium } from "react-device-detect";
import Tilty from "react-tilty";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const hasBackdropBlurBug = isOpera || isEdge || isChrome || isChromium;
const USE_LIGHTBOX_VIDEO_PLAYER = false;

const SMALL_THUMBNAIL_SUFFIX = "t";
const MEDIUM_THUMBNAIL_SUFFIX = "m";
const LARGE_THUMBNAIL_SUFFIX = "l";
const HUGE_THUMBNAIL_SUFFIX = "h";

export default function GallerySection({
	header,
	id,
	media,
	direction,
	thumbnailSize
}) {
	const { width } = useWindowDimensions();
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		sourceIndex: 0
	});

	const isMobile = width < 768;
	const tnSuffix = determineThumbnailSuffix(thumbnailSize);

	function openLightboxOnIndex(index) {
		setLightboxController((prev) => ({
			toggler: !prev.toggler,
			sourceIndex: index
		}));
	}

	function formatMedia(mediaArray) {
		return mediaArray.map((media, i) => {
			let source,
				width,
				height = "";
			if (media.youtubeId && USE_LIGHTBOX_VIDEO_PLAYER) {
				source = `https://img.youtube.com/vi/${media.youtubeId}/hqdefault.jpg`;
				width = 480;
				height = 360;
			} else {
				source = media.youtubeId
					? `https://www.youtube-nocookie.com/embed/${media.youtubeId}?modestbranding=1&rel=0`
					: getImgurSpecialUrl(media.src, tnSuffix);
				width = media.width;
				height = media.height;
			}
			return {
				src: source,
				width: width,
				height: height,
				alt: media.desc,
				youtubeId: media.youtubeId
			};
		});
	}

	const MediaComponent = ({
		index,
		direction,
		top,
		left,
		margin,
		photo: media
	}) => {
		if (media.youtubeId) {
			return (
				<VideoPlayerThumbnail
					videoSource={media}
					margin={margin}
					direction={direction}
					onClick={() => openLightboxOnIndex(index)}
					left={left}
					top={top}
					embeddedPlayer={!USE_LIGHTBOX_VIDEO_PLAYER}
					key={media.src}
				/>
			);
		} else {
			return (
				<TiltableImage
					margin={margin}
					onClick={() => openLightboxOnIndex(index)}
					image={media}
					key={media.src}
				/>
			);
		}
	};

	return (
		<div className="mt-2" id={id}>
			<h3 className="mb-4">{header}</h3>
			<Gallery
				photos={formatMedia(media)}
				margin={direction === "column" ? 10 : 3}
				renderImage={MediaComponent}
				direction={direction}
				columns={isMobile ? 1 : 2}
			/>
			<FsLightbox
				toggler={lightboxController.toggler}
				sources={formatLightboxMedia(media)}
				customAttributes={media.map((media) => ({
					alt: media.desc
				}))}
				sourceIndex={lightboxController.sourceIndex}
				onClose={addBackDropBlur}
				onOpen={hideBackDropBlur}
				exitFullscreenOnClose
			/>
		</div>
	);
}

const TiltableImage = ({ margin, onClick, image }) => {
	return (
		<Tilty
			max={25}
			perspective={1500}
			speed={1000}
			className="gallery-tilty"
			style={{ margin }}>
			<img
				src={image.src}
				width={image.width}
				height={image.height}
				alt={image.alt}
				onClick={onClick}
			/>
			<div className="gallery-tilty-inner rounded">{image.alt}</div>
		</Tilty>
	);
};

const VideoPlayerThumbnail = ({
	videoSource,
	margin,
	direction,
	left,
	top,
	onClick,
	embeddedPlayer
}) => {
	if (embeddedPlayer) {
		return (
			<div className="ratio ratio-16x9">
				<iframe
					src={videoSource.src}
					title={videoSource.desc}
					style={{
						border: 0,
						width: videoSource.width,
						height: videoSource.height,
						margin: margin,
						position: direction === "column" ? "absolute" : "initial",
						left: direction === "column" ? left : "initial",
						top: direction === "column" ? top : "initial"
					}}
					allowFullScreen></iframe>
			</div>
		);
	} else {
		return (
			<img
				src={videoSource.src}
				alt={videoSource.desc}
				style={{
					width: videoSource.width,
					height: videoSource.height,
					margin: margin,
					position: direction === "column" ? "absolute" : "initial",
					left: direction === "column" ? left : "initial",
					top: direction === "column" ? top : "initial"
				}}
				onClick={onClick}
			/>
		);
	}
};

function addBackDropBlur() {
	if (!hasBackdropBlurBug) {
		return;
	}
	[...document.querySelectorAll(".wrapper")].forEach((wrapper) => {
		wrapper.className += " back-blur";
	});
}

function hideBackDropBlur() {
	if (!hasBackdropBlurBug) {
		return;
	}
	[...document.querySelectorAll(".wrapper")].forEach((wrapper) => {
		wrapper.classList.remove("back-blur");
	});
}

function formatLightboxMedia(mediaArray) {
	const result = mediaArray.map((media) => {
		if (media.youtubeId && USE_LIGHTBOX_VIDEO_PLAYER) {
			return (
				<iframe
					src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}?modestbranding=1&rel=0`}
					title={media.alt}
					width="1920px"
					height="1080px"
					frameBorder="0"
					allow="autoplay; fullscreen"
					allowFullScreen
				/>
			);
		} else {
			return media.src;
		}
	});
	return result;
}

function determineThumbnailSuffix(sizeString) {
	switch (sizeString) {
		case "small":
		case SMALL_THUMBNAIL_SUFFIX:
			return SMALL_THUMBNAIL_SUFFIX;
		case "medium":
		case MEDIUM_THUMBNAIL_SUFFIX:
			return MEDIUM_THUMBNAIL_SUFFIX;
		case "large":
		case LARGE_THUMBNAIL_SUFFIX:
			return LARGE_THUMBNAIL_SUFFIX;
		case "huge":
		case HUGE_THUMBNAIL_SUFFIX:
			return HUGE_THUMBNAIL_SUFFIX;
		default:
			return LARGE_THUMBNAIL_SUFFIX;
	}
}
