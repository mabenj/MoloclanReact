import React from "react";

export default function MoloBigText(props) {
	return (
		<rect
			id="img-logo"
			x="41"
			y="57"
			width="448"
			height="135"
			fill="url(#pattern0)"
			className={props.className}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		/>
	);
}
