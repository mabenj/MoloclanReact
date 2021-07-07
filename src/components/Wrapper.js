import React from "react";

export default function Wrapper(props) {
	return <div className="wrapper back-blur text-justify">{props.children}</div>;
}
