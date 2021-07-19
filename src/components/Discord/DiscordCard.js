import React from "react";
import DiscordTableData from "./DiscordTableData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";

const TsIcon = () => {
	return <FontAwesomeIcon icon={["fab", "teamspeak"]} />;
};

const DiscordIcon = () => {
	return <FontAwesomeIcon icon={["fa", "poop"]} style={{ color: "#7a5901" }} />;
};

const SkypeIcon = () => {
	return <FontAwesomeIcon icon={["fab", "skype"]} />;
};

export default function DiscordCard() {
	return (
		<>
			<Table striped borderless responsive className="rounded discord-table">
				<thead>
					<tr>
						<th></th>
						<th id="ts3" className="text-center">
							TS&nbsp;3&nbsp;&nbsp;
							<TsIcon />
						</th>
						<th id="discord" className="text-center">
							Discord&nbsp;&nbsp;
							<DiscordIcon />
						</th>
						<th id="skype" className="text-center">
							Skype&nbsp;&nbsp;
							<SkypeIcon />
						</th>
					</tr>
				</thead>
				<tbody>
					{DiscordTableData.rows.map(({ displayName, valueMapping }) => {
						const ts3Value = getCellDisplayValue(valueMapping.ts3);
						const discordValue = getCellDisplayValue(valueMapping.discord);
						const skypeValue = getCellDisplayValue(valueMapping.skype);
						return (
							<tr key={displayName}>
								<td>{displayName}</td>
								<td className="text-center align-middle">{ts3Value}</td>
								<td className="text-center align-middle">{discordValue}</td>
								<td className="text-center align-middle">{skypeValue}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}

function getCellDisplayValue(cellValue) {
	switch (cellValue) {
		case true:
			return <FontAwesomeIcon icon="check-circle" className="success-color" />;
		case false:
			return <FontAwesomeIcon icon="times-circle" className="error-color" />;
		default:
			return cellValue;
	}
}
