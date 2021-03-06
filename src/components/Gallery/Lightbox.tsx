import FsLightbox from "fslightbox-react";
import IExternalMediaSource from "../../MediaSources/IExternalMediaSource";
import { getImgurUrl, getYoutubeUrl } from "../../Utils";
import { isOpera, isEdge, isChrome, isChromium } from "react-device-detect";

const HAS_BACKDROP_FILTER_BUG = isOpera || isEdge || isChrome || isChromium;

interface ILightboxProps {
	toggler: boolean;
	sourceMedias: IExternalMediaSource[];
	index: number;
	enableCustomSources?: boolean;
	customSourceNodes?: JSX.Element[] | undefined;
}

const Lightbox = ({
	toggler,
	sourceMedias,
	index,
	enableCustomSources = false
}: ILightboxProps) => {
	return (
		<FsLightbox
			toggler={toggler}
			sources={formatLightboxMedia(sourceMedias)}
			customSources={
				enableCustomSources
					? formatLightboxCustomMedia(sourceMedias)
					: undefined
			}
			types={sourceMedias.map((media) =>
				media.provider === "youtube" ? "youtube" : "image"
			)}
			sourceIndex={index}
			onClose={HAS_BACKDROP_FILTER_BUG ? addBackDropBlur : undefined}
			onOpen={HAS_BACKDROP_FILTER_BUG ? hideBackDropBlur : undefined}
			exitFullscreenOnClose
		/>
	);
};

const formatLightboxMedia = (
	mediaSources: IExternalMediaSource[]
): string[] => {
	return mediaSources.map((media) => {
		return media.provider === "youtube"
			? getYoutubeUrl(media.id)
			: getImgurUrl(media.id);
	});
};

const formatLightboxCustomMedia = (
	mediaSources: IExternalMediaSource[]
): JSX.Element[] => {
	return mediaSources
		.filter((media) => media.provider === "youtube")
		.map((media) => {
			return (
				<iframe
					src={getYoutubeUrl(media.id)}
					title={media.desc}
					width="1920px"
					height="1080px"
					frameBorder="0"
					allow="autoplay; fullscreen"
					allowFullScreen
				/>
			);
		});
};

function addBackDropBlur() {
	const wrappers = document.querySelectorAll<HTMLDivElement>(".wrapper");
	wrappers.forEach((wrapper) => {
		wrapper.className += " back-blur";
	});
}

function hideBackDropBlur() {
	const wrappers = document.querySelectorAll<HTMLDivElement>(".wrapper");
	wrappers.forEach((wrapper) => {
		wrapper.classList.remove("back-blur");
	});
}

export default Lightbox;
