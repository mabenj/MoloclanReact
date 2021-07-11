import React, { useEffect } from "react";
import TSViewerUrls from "./TSViewerUrls.json";
import { waitForElem } from "../../Utils";

export default function TSViewer() {
	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = TSViewerUrls.loaderUrl;
		script.onload = () => {
			const ts3v_url_1 = TSViewerUrls.viewerUrl;
			// eslint-disable-next-line no-undef
			ts3v_display.init(ts3v_url_1, 1121036, 100);
			waitForElem('[title="TSViewer for TeamSpeak 3 by TSViewer.com"]').then(
				(elem) => {
					elem.parentNode.removeChild(elem);
				}
			);
			waitForElem('[title="TSViewer for Android"]').then((elem) => {
				elem.parentNode.removeChild(elem);
			});
		};
		document.body.appendChild(script);
	}, []);

	return (
		<div id="ts3viewer_1121036" className="TSViewer">
			{" "}
		</div>
	);
}
