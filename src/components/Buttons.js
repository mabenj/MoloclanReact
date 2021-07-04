import React, { useState, useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trimProtocolAndQueryString } from "../Utils";

const TOOLTIP_DURATION = 1000;

export function CopyButton({ targetUrl }) {
	const [showTooltip, setShowTooltip] = useState(false);
	const targetRef = useRef(null);

	const handleCopy = (e) => {
		const textToCopy = trimProtocolAndQueryString(targetUrl);
		navigator.clipboard.writeText(textToCopy);
		setShowTooltip(true);
		setTimeout(() => {
			setShowTooltip(false);
		}, TOOLTIP_DURATION);
	};

	return (
		<>
			<Button
				as="span"
				className="custom-btn"
				variant=""
				ref={targetRef}
				onClick={handleCopy}>
				<FontAwesomeIcon icon={["far", "copy"]} />
			</Button>
			<Overlay target={targetRef.current} show={showTooltip} placement="top">
				{(props) => <Tooltip {...props}>Kopioitu'd :D</Tooltip>}
			</Overlay>
		</>
	);
}

export function OpenButton({ href, target }) {
	return (
		<>
			<Button
				variant=""
				className="custom-btn"
				href={href}
				target={target ? target : "_blank"}>
				<FontAwesomeIcon icon="external-link-alt" />
			</Button>
		</>
	);
}
