import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";

export default function Galleria({ documentTitle }) {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);
	return <Wrapper>Huutis</Wrapper>;
}
