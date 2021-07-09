import React, { useEffect } from "react";
import TSViewerUrls from "./TSViewerUrls.json";

export default function TSViewer() {
	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = TSViewerUrls.loaderUrl;
		script.onload = () => {
			const ts3v_url_1 = TSViewerUrls.viewerUrl;
			// eslint-disable-next-line no-undef
			ts3v_display.init(ts3v_url_1, 1121036, 100);
			const tsvWatermark = document.querySelector(
				'[title="TSViewer for TeamSpeak 3 by TSViewer.com"]'
			);
			const googlePlayAd = document.querySelector(
				'[title="TSViewer for Android"]'
			);
			tsvWatermark?.parentNode.removeChild(tsvWatermark);
			googlePlayAd?.parentNode.removeChild(googlePlayAd);
		};
		document.body.appendChild(script);
	}, []);

	return (
		<div id="ts3viewer_1121036" className="TSViewer">
			{" "}
		</div>
	);
}
