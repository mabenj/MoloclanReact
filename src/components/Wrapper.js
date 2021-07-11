import React from "react";

export default function Wrapper({ children }) {
	return <div className="wrapper back-blur">{children}</div>;
}
