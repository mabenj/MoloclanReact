/* eslint-disable no-unused-vars */
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getImgurSpecialUrl } from "../Utils";

const SMALL_THUMBNAIL_SUFFIX = "t";
const MEDIUM_THUMBNAIL_SUFFIX = "m";
const LARGE_THUMBNAIL_SUFFIX = "l";
const HUGE_THUMBNAIL_SUFFIX = "h";

export default function GallerySection({ header, id, images }) {
	return (
		<div className="mt-5">
			<h3 className="mb-4" id={id}>
				{header}
			</h3>
			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
				<Masonry gutter="20px">
					{images.map((image, i) => (
						<img
							key={i}
							src={getImgurSpecialUrl(image.src, LARGE_THUMBNAIL_SUFFIX)}
							alt={image.desc}
							style={{ width: "100%", display: "block" }}></img>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	);
}
