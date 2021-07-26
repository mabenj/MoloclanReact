import React from "react";

const LineTopLeft: React.FC<React.HTMLAttributes<any>> = (props) => {
	return (
		<line
			{...props}
			id="line-tl"
			x1="41"
			y1="33.5"
			x2="144"
			y2="33.5"
			strokeWidth="5"
		/>
	);
};

export default LineTopLeft;
