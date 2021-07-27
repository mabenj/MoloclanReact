import Wrapper from "../components/Wrapper";
import LegoManImage from "../img/404.jpg";

export default function NotFound() {
	return (
		<Wrapper>
			<h1>404</h1>
			{/* cSpell: disable */}
			<p className="lead">Eipäs löytynykkään</p>
			<img
				src={LegoManImage}
				alt="lego-ukko"
				width="100%"
				className="rounded"
			/>
		</Wrapper>
	);
}
