export function getItemOrNull(key) {
	const stored = sessionStorage.getItem(key);
	return stored ? JSON.parse(stored) : null;
}

export function setItem(key, item) {
	sessionStorage.setItem(key, JSON.stringify(item));
}

const sessionStorageService = {
	getItemOrNull,
	setItem
};

export default sessionStorageService;
