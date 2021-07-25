import React from "react";
import DiscordTableData from "./discord-table-data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";

interface IDiscordTableRow {
	displayName: string;
	ts3: boolean | string;
	discord: boolean | string;
	skype: boolean | string;
}

const tableRows = discordTableData as IDiscordTableRow[];

const TsIcon = () => {
	return <FontAwesomeIcon icon={["fab", "teamspeak"]} />;
};

const DiscordIcon = () => {
	return (
		<FontAwesomeIcon icon={["fas", "poop"]} style={{ color: "#7a5901" }} />
	);
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
					{tableRows.map(({ displayName, ts3, discord, skype }) => {
						const ts3Value = getCellComponent(ts3);
						const discordValue = getCellComponent(discord);
						const skypeValue = getCellComponent(skype);
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

function getCellComponent(cellValue: string | boolean): JSX.Element {
	switch (cellValue) {
		case true:
			return <FontAwesomeIcon icon="check-circle" className="success-color" />;
		case false:
			return <FontAwesomeIcon icon="times-circle" className="error-color" />;
		default:
			return <>{cellValue}</>;
	}
}
