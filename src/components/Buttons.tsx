import React, { useState, useRef, HTMLAttributes } from "react";
import { Button, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trimProtocolAndQueryString } from "../Utils";

const TOOLTIP_DURATION = 1000;

interface ICopyButton {
	targetText: string;
}

export const CopyButton: React.FC<ICopyButton> = ({ targetText }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const targetRef = useRef<HTMLSpanElement>(null);

	const handleCopy: React.MouseEventHandler<HTMLElement> = (_e) => {
		const textToCopy = trimProtocolAndQueryString(targetText);
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
				overlay={<Tooltip id={targetText}>Kopioi tää</Tooltip>}
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
				{(props) => (
					<Tooltip id={targetText} {...props}>
						Kopioitu'd :D
					</Tooltip>
				)}
			</Overlay>
		</>
	);
};

interface IOpenButton {
	href: string;
	verb: string;
	target?: "_self" | "_blank";
}

export const OpenButton: React.FC<IOpenButton> = ({
	href,
	target = "_blank",
	verb
}) => {
	return (
		<>
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip id={href}>{verb}</Tooltip>}>
				<Button
					as="span"
					variant=""
					className="custom-btn"
					onClick={() => window.open(href, target)}>
					<FontAwesomeIcon icon="external-link-alt" />
				</Button>
			</OverlayTrigger>
		</>
	);
};

export const HamburgerButton: React.FC<HTMLAttributes<any>> = (props) => {
	return (
		<button
			{...props}
			className={`menu-button ${props.className}`}
			onClick={props.onClick}>
			<FontAwesomeIcon icon="bars" />
		</button>
	);
};

export const CloseButton: React.FC<HTMLAttributes<any>> = (props) => {
	return (
		<button
			{...props}
			className={`menu-button ${props.className}`}
			onClick={props.onClick}>
			<FontAwesomeIcon icon="times" />
		</button>
	);
};
