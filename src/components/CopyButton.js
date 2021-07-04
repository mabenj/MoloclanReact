import React, { useState, useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TOOLTIP_DURATION = 1000;

export default function CopyButton({ target, variant }) {
	const [showTooltip, setShowTooltip] = useState(false);
	const targetRef = useRef(null);

	const handleCopy = (e) => {
		navigator.clipboard.writeText(target);
		setShowTooltip(true);
		setTimeout(() => {
			setShowTooltip(false);
		}, TOOLTIP_DURATION);
	};

	return (
		<>
			<Button variant={variant} size="sm" ref={targetRef} onClick={handleCopy}>
				Kopioi&nbsp;
				<FontAwesomeIcon icon={["far", "copy"]} />
			</Button>
			<Overlay target={targetRef.current} show={showTooltip} placement="top">
				{(props) => <Tooltip {...props}>Kopioitu'd :D</Tooltip>}
			</Overlay>
		</>
	);
}
