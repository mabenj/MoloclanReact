export function cloneDeep(object: any): any {
	return JSON.parse(JSON.stringify(object));
}

export function trimProtocol(url: string): string {
	return url.replace(/(^\w+:|^)\/\//, "");
}

export function trimProtocolAndQueryString(url: string): string {
	let trimmed = trimProtocol(url).split("?")[0];
	trimmed =
		trimmed[trimmed.length - 1] === "/"
			? trimmed.substring(0, trimmed.length - 1)
			: trimmed;
	return trimmed;
}

export function Nbsp(): string {
	return "\u00A0";
}

export function getImgurUrl(
	id: string,
	suffix: string = "",
	extension: ".jpg" | ".png" | ".mp4" = ".jpg"
) {
	const url = `https://i.imgur.com/${id}${suffix}${extension}`;
	return url;
}

export function getYoutubeUrl(id: string) {
	return `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0`;
}

export function getYoutubeThumbnailUrl(id: string) {
	return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// https://stackoverflow.com/a/61511955
export function waitForElem(selector: string): Promise<Element | null> {
	return new Promise<Element | null>((resolve) => {
		if (document.querySelector(selector)) {
			resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}

export async function waitForElemAndDelete(selector: string): Promise<void> {
	const elem = await waitForElem(selector);
	elem?.parentNode?.removeChild(elem);
}

export function scrollToElementSmooth(selector: string): void {
	const yOffset = -100;
	const element = document.querySelector(selector);
	const y =
		(element?.getBoundingClientRect()?.top || 0) + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: "smooth" });
}

export async function animateCSS(
	selector: string,
	animation: string,
	prefix = "animate__"
) {
	const animationName = `${prefix}${animation}`;
	const nodes = document.querySelectorAll(selector);

	nodes.forEach((node) => {
		const handleAnimationEnd: EventListenerOrEventListenerObject = (
			event: Event
		) => {
			event.stopPropagation();
			node.classList.remove(`${prefix}animated`, animationName);
			return "Animation ended";
		};

		node.classList.add(`${prefix}animated`, animationName);
		node.addEventListener("animationend", handleAnimationEnd, { once: true });
	});
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
