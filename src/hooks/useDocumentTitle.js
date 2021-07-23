import { useEffect } from "react";

export default function useDocumentTitle(documentTitle) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
}
