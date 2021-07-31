export default interface IExternalMediaSource {
	id: string;
	desc: string;
	width: number;
	height: number;
	provider: "youtube" | "imgur";
	type: "mp4" | "jpg" | "png" | "iframe";
	posterSrcId?: "string";
}
