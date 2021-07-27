import { useEffect } from "react";
import TSVConfig from "./tsviewer-config.json";
import { waitForElemAndDelete } from "../../Utils";

interface ITSViewerConfig {
	loaderUrl: string;
	viewerUrl: string;
	id: number;
}

const config = TSVConfig as ITSViewerConfig;

const elementsToDelete = [
	"[title='TSViewer for TeamSpeak 3 by TSViewer.com']",
	"[title='TSViewer for Android']"
];

const TSViewer = () => {
	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = config.loaderUrl;
		script.onload = () => {
			const ts3v_url_1 = config.viewerUrl;
			// @ts-ignore
			ts3v_display.init(ts3v_url_1, config.id, 100);
			elementsToDelete.forEach(waitForElemAndDelete);
		};
		document.body.appendChild(script);
	}, []);

	return (
		<div id={`ts3viewer_${config.id}`} className="TSViewer">
			{" "}
		</div>
	);
};

export default TSViewer;
