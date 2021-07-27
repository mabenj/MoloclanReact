import { useEffect } from "react";

const useDocumentTitle = (documentTitle: string): void => {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
};

export default useDocumentTitle;
