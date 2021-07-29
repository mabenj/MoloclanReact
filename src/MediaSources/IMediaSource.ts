export default interface IExternalMediaSource {
	id: string;
	desc: string;
	width: number;
	height: number;
	type: "youtube" | "imgur";
}
