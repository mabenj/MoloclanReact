import React from "react";

const LineBottomRight: React.FC = (props) => {
	return (
		<line
			{...props}
			id="line-br"
			x1="323"
			y1="210.5"
			x2="489"
			y2="210.5"
			strokeWidth="5"
		/>
	);
};

export default LineBottomRight;
