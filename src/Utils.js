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
