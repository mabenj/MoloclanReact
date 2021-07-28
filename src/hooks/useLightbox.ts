import { useState } from "react";

interface ILightboxController {
	toggler: boolean;
	sourceIndex: number;
}

const useLightbox = () => {
	const [lightboxController, setLightboxController] =
		useState<ILightboxController>({
			toggler: false,
			sourceIndex: 0
		});

	const openOnIndex = (index: number) => {
		setLightboxController((prev) => ({
			toggler: !prev.toggler,
			sourceIndex: index
		}));
	};

	return [lightboxController.toggler, lightboxController.sourceIndex, openOnIndex] as const;
};

export default useLightbox;
