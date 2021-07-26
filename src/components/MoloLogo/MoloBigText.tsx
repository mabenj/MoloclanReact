import React from "react";

const MoloBigText: React.FC<React.HTMLAttributes<any>> = (props) => {
	return (
		<rect
			{...props}
			id="img-logo"
			x="41"
			y="57"
			width="448"
			height="135"
			fill="url(#pattern0)"
		/>
	);
};

export default MoloBigText;
