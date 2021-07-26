import React from "react";

const LineBottomLeft: React.FC = (props) => {
	return (
		<line
			{...props}
			id="line-bl"
			x1="41"
			y1="210.5"
			x2="203"
			y2="210.5"
			strokeWidth="5"
		/>
	);
};

export default LineBottomLeft;
