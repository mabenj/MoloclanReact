import React from "react";

const LineTopRight: React.FC<React.HTMLAttributes<any>> = (props) => {
	return (
		<line
			{...props}
			id="line-tr"
			x1="385"
			y1="33.5"
			x2="489"
			y2="33.5"
			strokeWidth="5"
		/>
	);
};

export default LineTopRight;
