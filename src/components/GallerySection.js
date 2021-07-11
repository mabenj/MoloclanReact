/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import FsLightbox from "fslightbox-react";
import { getImgurSpecialUrl } from "../Utils";
import { isOpera, isEdge, isChrome, isChromium } from "react-device-detect";
import Tilty from "react-tilty";
import useWindowDimensions from "../hooks/useWindowDimensions";

const hasBackdropBlurBug = isOpera || isEdge || isChrome || isChromium;

const SMALL_THUMBNAIL_SUFFIX = "t";
const MEDIUM_THUMBNAIL_SUFFIX = "m";
const LARGE_THUMBNAIL_SUFFIX = "l";
const HUGE_THUMBNAIL_SUFFIX = "h";

export default function GallerySection({ header, id, media, direction }) {
	const { width } = useWindowDimensions();
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		sourceIndex: 0
	});

	const isMobile = width < 768;

	function openLightboxOnIndex(index) {
		setLightboxController((prev) => ({
			toggler: !prev.toggler,
			sourceIndex: index
		}));
	}

	const MediaComponent = ({
		index,
		direction,
		top,
		left,
		margin,
		photo: media
	}) => {
		if (media.iframe) {
			return (
				<VideoPlayer
					videoSource={media}
					margin={margin}
					direction={direction}
					left={left}
					top={top}
				/>
			);
		} else {
			return (
				<TiltableImage
					margin={margin}
					onClick={() => openLightboxOnIndex(index)}
					image={media}
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
				sources={media.map((media) => media.src)}
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
			style={{ transformStyle: "preserve-3d" }}>
			<div className="gallery-image" style={{ margin }} onClick={onClick}>
				<img
					src={image.src}
					alt={image.alt}
					width={image.width}
					height={image.height}
				/>
				<p className="rounded">{image.alt}</p>
			</div>
		</Tilty>
	);
};

const VideoPlayer = ({ videoSource, margin, direction, left, top }) => {
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

function formatMedia(mediaArray) {
	return mediaArray.map((media) => {
		return {
			src: media.iframe
				? media.src
				: getImgurSpecialUrl(media.src, LARGE_THUMBNAIL_SUFFIX),
			width: media.width,
			height: media.height,
			alt: media.desc,
			iframe: media.iframe
		};
	});
}
