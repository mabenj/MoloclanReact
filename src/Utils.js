export function cloneDeep(object) {
	return JSON.parse(JSON.stringify(object));
}

export function trimProtocol(url) {
	return url.replace(/(^\w+:|^)\/\//, "");
}

export function trimProtocolAndQueryString(url) {
	return trimProtocol(url).split("?")[0];
}

export function Nbsp() {
	return "\u00A0";
}

export function getImgurSpecialUrl(url, suffix) {
	if (!url) {
		return url;
	}
	const noExtension = url.substring(0, url.lastIndexOf("."));
	const extension = url.substring(url.lastIndexOf("."));
	return `${noExtension}${suffix}${extension}`;
}
