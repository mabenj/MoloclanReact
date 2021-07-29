// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FsLightboxProps } from "fslightbox-react";

declare module "fslightbox-react" {
	interface FsLightboxProps {
		exitFullscreenOnClose?: boolean;
	}
}
