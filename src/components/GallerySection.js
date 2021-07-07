/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import FsLightbox from "fslightbox-react";
import { getImgurSpecialUrl } from "../Utils";
import { isOpera, isEdge, isChrome, isChromium } from "react-device-detect";

const hasBackdropBlurBug = isOpera || isEdge || isChrome || isChromium;

const SMALL_THUMBNAIL_SUFFIX = "t";
const MEDIUM_THUMBNAIL_SUFFIX = "m";
const LARGE_THUMBNAIL_SUFFIX = "l";
const HUGE_THUMBNAIL_SUFFIX = "h";

export default function GallerySection({ header, id, media, direction }) {
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		sourceIndex: 0
	});

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
				<div className="ratio ratio-16x9">
					<iframe
						src={media.src}
						title={media.desc}
						style={{
							border: 0,
							width: media.width,
							height: media.height,
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
				<div
					className="gallery-image"
					style={{ margin }}
					onClick={() => openLightboxOnIndex(index)}>
					<img
						src={media.src}
						alt={media.desc}
						width={media.width}
						height={media.height}
					/>
				</div>
			);
		}
	};

	return (
		<div className="mt-5" id={id}>
			<h3 className="mb-4">{header}</h3>
			<Gallery
				photos={formatMedia(media)}
				margin={direction === "column" ? 10 : 3}
				renderImage={MediaComponent}
				direction={direction}
				columns={2}
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
