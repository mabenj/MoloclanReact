import React from "react";
import Tilty from "react-tilty";
import IExternalMediaSource from "../../MediaSources/IExternalMediaSource";

export interface IMediaComponentProps extends IExternalMediaSource {
	src: string;
	direction: "row" | "column";
	thumbnailSize?: "small" | "medium" | "large" | "huge";
	style?: React.CSSProperties;
	onClick?: (event: React.MouseEvent) => void | null;
}

const MediaComponent = (props: IMediaComponentProps) => {
	const baseStyle: React.CSSProperties = {
		width: props.width,
		height: props.height,
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
		<video key={props.id} controls style={props.style}>
			<source src={props.src} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

const MediaTiltableImage = (props: IMediaComponentProps) => {
	return (
		<Tilty
			key={props.id}
			max={25}
			perspective={1500}
			speed={1000}
			className="gallery-tilty">
			<img
				src={props.src}
				alt={props.desc}
				onClick={props.onClick}
				style={props.style}
			/>
			<div className="gallery-tilty-inner rounded">{props.desc}</div>
		</Tilty>
	);
};

const MediaIframe = (props: IMediaComponentProps) => {
	const iFrameStyle: React.CSSProperties = Object.assign(
		{ border: 0 },
		props.style
	);
	return (
		<iframe
			key={props.id}
			src={props.src}
			title={props.desc}
			style={iFrameStyle}
			allowFullScreen
		/>
	);
};

export default MediaComponent;
