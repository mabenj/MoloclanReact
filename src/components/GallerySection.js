/* eslint-disable no-unused-vars */
import React from "react";
import Gallery from "react-photo-gallery";
import { getImgurSpecialUrl } from "../Utils";

const SMALL_THUMBNAIL_SUFFIX = "t";
const MEDIUM_THUMBNAIL_SUFFIX = "m";
const LARGE_THUMBNAIL_SUFFIX = "l";
const HUGE_THUMBNAIL_SUFFIX = "h";

export default function GallerySection({ header, id, media, direction }) {
	return (
		<div className="mt-5">
			<h3 className="mb-4" id={id}>
				{header}
			</h3>
			<Gallery
				photos={formatMedia(media)}
				margin={direction === "column" ? 10 : 3}
				renderImage={MediaComponent}
				direction={direction}
				columns={2}
			/>
		</div>
	);
}

const MediaComponent = ({ direction, top, left, margin, photo: media }) => {
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
			<div className="gallery-image" style={{ margin }}>
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
