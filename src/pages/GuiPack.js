import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";

export default function GuiPack({ documentTitle }) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return <Wrapper>Huutis</Wrapper>;
}
