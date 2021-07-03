import React from "react";
import { Row, Col } from "react-bootstrap";
import ServerIPInfo from "../components/ServerIPInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ServerSection({
	serverComponent,
	displayName,
	faIcon,
	ipArray
}) {
	return (
		<>
			<div className="wrapper text-justify">
				<h3>
					{displayName}&nbsp;
					{faIcon ? <FontAwesomeIcon icon={faIcon} /> : ""}
				</h3>
				<Row style={{ marginTop: "30px" }}>
					<Col md="7">{serverComponent}</Col>
					<Col>{ipArray ? <ServerIPInfo ipArray={ipArray} /> : ""}</Col>
				</Row>
			</div>
		</>
	);
}
