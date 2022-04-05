import { useEffect } from "react";
import { waitForElements, waitForElementsAndDelete } from "../../Utils";
import TSVConfig from "./tsviewer-config.json";

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
		script.onload = async () => {
			const ts3v_url_1 = config.viewerUrl;
			// @ts-ignore
			ts3v_display.init(ts3v_url_1, config.id, 100);
			removeUnnecessaryStuff();
		};
		document.body.appendChild(script);
	}, []);

	return (
		<div id={`ts3viewer_${config.id}`} className="TSViewer">
			{" "}
		</div>
	);
};

async function removeUnnecessaryStuff() {
	elementsToDelete.forEach(waitForElementsAndDelete);

	const title = (((await waitForElements(
		"[title='Connect to TeamSpeak 3 Server']"
	)) as NodeListOf<HTMLAnchorElement>) || [])[0];
	if (title) {
		title.href = "";
		title.title = "";
	}

	const usersCounter = (((await waitForElements(
		"[title='More Details at TSViewer.com']"
	)) as NodeListOf<HTMLAnchorElement>) || [])[0];
	if (usersCounter) {
		usersCounter.href = "";
		usersCounter.title = "";
		usersCounter.target = "_self";
	}

	const users = (await waitForElements(
		".tsv_level.tsv_user"
	)) as NodeListOf<HTMLDivElement>;
	users.forEach((user) => {
		const newUserElement = user.cloneNode(true);
		user.parentNode?.replaceChild(newUserElement, user);
	});
}

export default TSViewer;
