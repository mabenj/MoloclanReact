export function getItemOrNull(key: string) {
	const stored = sessionStorage.getItem(key);
	return stored ? JSON.parse(stored) : null;
}

export function setItem(key: string, item: any): void {
	sessionStorage.setItem(key, JSON.stringify(item));
}

const sessionStorageService = {
	getItemOrNull,
	setItem
};

export default sessionStorageService;
