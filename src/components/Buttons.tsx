import React, { useState, useRef, HTMLAttributes } from "react";
import { Button, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TOOLTIP_DURATION = 1000;

export const CopyButton = ({ targetText }: { targetText: string }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const targetRef = useRef<HTMLSpanElement>(null);

	const handleCopy: React.MouseEventHandler<HTMLElement> = (_e) => {
		navigator.clipboard.writeText(targetText);
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

export const OpenButton = ({
	href,
	verb,
	target = "_blank"
}: {
	href: string;
	verb: string;
	target?: "_self" | "_blank";
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

export const HamburgerButton = (props: HTMLAttributes<any>) => {
	return (
		<button
			{...props}
			className={`menu-button ${props.className}`}
			onClick={props.onClick}>
			<FontAwesomeIcon icon="bars" />
		</button>
	);
};

export const CloseButton = (props: HTMLAttributes<any>) => {
	return (
		<button
			{...props}
			className={`menu-button ${props.className}`}
			onClick={props.onClick}>
			<FontAwesomeIcon icon="times" />
		</button>
	);
};
