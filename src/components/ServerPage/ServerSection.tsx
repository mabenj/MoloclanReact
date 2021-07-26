import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nbsp } from "../../Utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IServerSection {
	header: string;
	serverComponent: JSX.Element;
	infoComponent?: JSX.Element;
	faIcon?: IconProp;
}

const ServerSection: React.FC<IServerSection> = ({
	serverComponent,
	infoComponent,
	header,
	faIcon
}) => {
	const styleRow: React.CSSProperties = {
		marginTop: "30px"
	};
	const styleCol: React.CSSProperties = {
		marginBottom: "30px"
	};

	return (
		<>
			<h3>
				{header}
				{faIcon ? Nbsp() + <FontAwesomeIcon icon={faIcon} /> : null}
			</h3>
			<Row style={styleRow}>
				<Col
					xl={infoComponent ? 7 : 12}
					lg={infoComponent ? 8 : 12}
					md={infoComponent ? 9 : 12}
					style={styleCol}>
					{serverComponent}
				</Col>
				{infoComponent ? <Col>{infoComponent}</Col> : null}
			</Row>
		</>
	);
};

export default ServerSection;
