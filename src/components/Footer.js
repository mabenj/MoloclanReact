import React from "react";
import GoogleMap from "./GoogleMap";

export default function Footer() {
	return (
		<footer className="footer-main">
			<div className="container p-4">
				<div className="row">
					<div className="col"></div>
					<div className="col-md-6">
						<h4 className="text-center text-white pb-2">Pääkonttori</h4>
						<ul className="list-unstyled">
							<li className="text-center text-white">Paska-avenue 42</li>
							<li className="text-center text-white">Karstula, 43 500 </li>
							<li className="text-center text-white mb-2">Suomi, Finland</li>
							<li className="text-center text-white">info@moloclan.fi</li>
							<li className="text-center text-white">+358 420 609 000</li>
							<li className="text-center text-white mt-4">
								<i>
									Copyright &copy; Markkinarako Oy™ {new Date().getFullYear()}
								</i>
							</li>
						</ul>
					</div>
					<div className="col">
						<GoogleMap />
					</div>
				</div>
			</div>
		</footer>
	);
}
