import React from "react";

const Wrapper = ({
	children
}: { children: React.ReactNode } & React.HTMLAttributes<any>) => {
	return <div className="wrapper back-blur">{children}</div>;
};

export default Wrapper;
