import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nbsp } from "../../Utils";

export default function ServerSection({
	serverComponent,
	infoComponent,
	displayName,
	faIcon
}) {
	return (
		<>
			<h3>
				{displayName ? displayName + Nbsp() : ""}
				{faIcon ? <FontAwesomeIcon icon={faIcon} /> : ""}
			</h3>
			<Row style={{ marginTop: "30px" }}>
				<Col lg={infoComponent ? 7 : 12} style={{ marginBottom: "30px" }}>
					{serverComponent}
				</Col>
				{infoComponent ? <Col>{infoComponent}</Col> : null}
			</Row>
		</>
	);
}
