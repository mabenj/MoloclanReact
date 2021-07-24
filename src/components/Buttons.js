import React, { useState, useRef } from "react";
import { Button, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
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
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip>Kopioi tää</Tooltip>}
				rootClose>
				<Button
					as="span"
					className="custom-btn"
					variant=""
					ref={targetRef}
					onClick={handleCopy}
					onMouseLeave={() => setShowTooltip(false)}>
					<FontAwesomeIcon icon={["far", "copy"]} />
				</Button>
			</OverlayTrigger>

			<Overlay target={targetRef.current} show={showTooltip} placement="top">
				{(props) => <Tooltip {...props}>Kopioitu'd :D</Tooltip>}
			</Overlay>
		</>
	);
}

export function OpenButton({ href, target, verb }) {
	return (
		<>
			<OverlayTrigger placement="top" overlay={<Tooltip>{verb}</Tooltip>}>
				<Button
					as="span"
					variant=""
					className="custom-btn"
					onClick={() => window.open(href, target ? target : "_blank")}>
					<FontAwesomeIcon icon="external-link-alt" />
				</Button>
			</OverlayTrigger>
		</>
	);
}

export function HamburgerButton({ id, onClick, style, className }) {
	return (
		<button
			id={id}
			className={`menu-button ${className}`}
			onClick={onClick}
			style={style}>
			<FontAwesomeIcon icon="bars" />
		</button>
	);
}

export function CloseButton({ id, onClick, style, className }) {
	return (
		<button
			id={id}
			className={`menu-button ${className}`}
			onClick={onClick}
			style={style}>
			<FontAwesomeIcon icon="times" />
		</button>
	);
}
