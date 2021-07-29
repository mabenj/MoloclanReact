import { IconDefinition, IconLookup } from "@fortawesome/fontawesome-svg-core";

export interface CustomIconConstruct extends IconDefinition, IconLookup {}

export const facMinecraft: CustomIconConstruct = {
	prefix: "fac",
	iconName: "minecraft",
	icon: [
		24,
		24,
		[],
		"none",
		"M4 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2V2ZM6 6V10H10V12H8V18H10V16H14V18H16V12H14V10H18V6H14V10H10V6H6Z"
	]
};
