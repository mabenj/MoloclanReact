import React, { useState, useEffect } from "react";
import locationService from "../services/locationService";
import weatherService from "../services/weatherService";

export default function WeatherWidget({ className, style }) {
	const [clientCity, setClientCity] = useState("");
	const [weatherInfo, setWeatherInfo] = useState({});

	useEffect(() => {
		async function fetchLocationAndWeather() {
			var locationInfo = await locationService.getClientLocationInfo();
			var weatherInfo = await weatherService.getWeatherInfo(
				locationInfo.lat,
				locationInfo.lon
			);
			setClientCity(locationInfo.city);
			setWeatherInfo(weatherInfo);
		}
		fetchLocationAndWeather();
	});

	if (!clientCity || !weatherInfo) {
		return null;
	}

	return (
		<div className={`text-white ml-3 ${className}`} style={style}>
			<span className="light-grey-color">
				{clientCity}&nbsp;&nbsp;&nbsp;{weatherInfo.weatherIcon}&nbsp;
				{weatherInfo.temperature}&nbsp;°C
			</span>
		</div>
	);
}
