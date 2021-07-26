export function cloneDeep(object) {
	return JSON.parse(JSON.stringify(object));
}

export function trimProtocol(url) {
	return url.replace(/(^\w+:|^)\/\//, "");
}

export function trimProtocolAndQueryString(url) {
	let trimmed = trimProtocol(url).split("?")[0];
	trimmed =
		trimmed[trimmed.length - 1] === "/"
			? trimmed.substring(0, trimmed.length - 1)
			: trimmed;
	return trimmed;
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

// https://stackoverflow.com/a/61511955
export function waitForElem(selector) {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver((mutations) => {
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

export async function waitForElemAndDelete(selector) {
	const elem = await waitForElem(selector);
	elem.parentNode?.removeChild(elem);
}

export function scrollToElementSmooth(selector) {
	const yOffset = -100;
	const element = document.querySelector(selector);
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: "smooth" });
}

export function animateCSS(selector, animation, prefix = "animate__") {
	new Promise((resolve, reject) => {
		const animationName = `${prefix}${animation}`;
		const nodes = document.querySelectorAll(selector);

		nodes.forEach((node) => {
			node.classList.add(`${prefix}animated`, animationName);
			node.addEventListener("animationend", handleAnimationEnd, { once: true });

			function handleAnimationEnd(event) {
				event.stopPropagation();
				node.classList.remove(`${prefix}animated`, animationName);
				resolve("Animation ended");
			}
		});
	});
}
