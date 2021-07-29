import React from "react";

const Wrapper = ({
	children,
	id
}: { children: React.ReactNode } & React.HTMLAttributes<any>) => {
	return (
		<div id={id} className="wrapper back-blur">
			{children}
		</div>
	);
};

export default Wrapper;
