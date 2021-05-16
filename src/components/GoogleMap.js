import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
	width: "100%",
	height: "100%"
};

export class MapContainer extends React.Component {
	render() {
		return (
			<>
				<Map
					google={this.props.google}
					zoom={12}
					style={mapStyles}
					initialCenter={{
						lat: 61.3329,
						lng: 23.7621
					}}>
					<Marker
						title={"Pääkonttori on tässä"}
						name={"Pääkonttori"}
						position={{ lat: 61.3268, lng: 23.7456 }}
						icon={{
							url: "/favicon-96x96.png",
							anchor: new this.props.google.maps.Point(12, 18),
							scaledSize: new this.props.google.maps.Size(40, 40)
						}}
					/>
					<Marker
						title={"Haarakonttori on tässä"}
						name={"Haarakonttori"}
						position={{ lat: 61.3236, lng: 23.7618 }}
						icon={{
							url: "/favicon-96x96.png",
							anchor: new this.props.google.maps.Point(18, 18),
							scaledSize: new this.props.google.maps.Size(40, 40)
						}}
					/>
				</Map>
			</>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAPS_API
})(MapContainer);
