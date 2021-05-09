import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
	width: "100%",
	height: "100%"
};

export class MapContainer extends React.Component {
	//61.342465731938304, 23.773186026305858
	// 61.336826016194365, 23.766062079251675
	render() {
		return (
			<>
				<Map
					google={this.props.google}
					zoom={12}
					style={mapStyles}
					initialCenter={{
						lat: 61.3368,
						lng: 23.766
					}}>
					<Marker
						title={"Pääkonttori on tässä."}
						name={"Pääkonttori"}
						position={{ lat: 61.3424, lng: 23.7731 }}
						icon={{
							url: "/favicon-96x96.png",
                            anchor: new this.props.google.maps.Point(8,8),
							scaledSize: new this.props.google.maps.Size(16, 16)
						}}
					/>
				</Map>
			</>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyCPoKzwJXc308pvU5Orh-WveNVeL3Wmp3Y"
})(MapContainer);
