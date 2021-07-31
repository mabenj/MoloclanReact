import React from "react";
import Tilty from "react-tilty";
import {
	getYoutubeUrl,
	getYoutubeThumbnailUrl,
	getImgurUrl
} from "../../Utils";
import IExternalMediaSource from "../../MediaSources/IExternalMediaSource";

export const THUMBNAILS: { [key: string]: string } = {
	small: "t",
	medium: "m",
	large: "l",
	huge: "h"
};

export interface IMediaComponentProps extends IExternalMediaSource {
	direction: "row" | "column";
	thumbnailSize?: "small" | "medium" | "large" | "huge";
	style?: React.CSSProperties;
	onClick?: (event: React.MouseEvent) => void | null;
}

const MediaComponent = (props: IMediaComponentProps) => {
	const baseStyle: React.CSSProperties = {
		margin: props.style?.margin,
		position: props.direction === "column" ? "absolute" : "initial",
		left: props.direction === "column" ? props.style?.left : "initial",
		top: props.direction === "column" ? props.style?.top : "initial"
	};

	switch (props.type) {
		case "mp4": {
			return <MediaVideo {...props} style={baseStyle} />;
		}
		case "jpg":
		case "png": {
			return <MediaTiltableImage {...props} style={baseStyle} />;
		}
		case "iframe": {
			return <MediaIframe {...props} style={baseStyle} />;
		}
		default:
			throw Error(`Not supported media type: ${props.type}`);
	}
};

const MediaVideo = (props: IMediaComponentProps) => {
	return (
		<video
			key={props.id}
			width={props.width}
			height={props.height}
			controls
			style={props.style}>
			<source src={getImgurUrl(props.id, "", ".mp4")} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

const MediaTiltableImage = (props: IMediaComponentProps) => {
	const src =
		props.provider === "youtube"
			? getYoutubeThumbnailUrl(props.id)
			: getImgurUrl(
					props.id,
					THUMBNAILS[props.thumbnailSize || "large"],
					props.type === "png" ? ".png" : ".jpg"
			  );

	return (
		<Tilty
			key={props.id}
			max={25}
			perspective={1500}
			speed={1000}
			className="gallery-tilty"
			style={props.style}>
			<img
				src={src}
				alt={props.desc}
				width={props.width}
				height={props.height}
				onClick={props.onClick}
			/>
			<div className="gallery-tilty-inner rounded">{props.desc}</div>
		</Tilty>
	);
};

const MediaIframe = (props: IMediaComponentProps) => {
	const iFrameStyle: React.CSSProperties = Object.assign(
		{
			border: 0,
			width: props.width,
			height: props.height
		},
		props.style
	);
	return (
		<iframe
			key={props.id}
			src={getYoutubeUrl(props.id)}
			title={props.desc}
			style={iFrameStyle}
			allowFullScreen
		/>
	);
};

export default MediaComponent;
