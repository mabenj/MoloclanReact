import React, { useState, useEffect } from "react";
import locationService from "../services/locationService";
import weatherService from "../services/weatherService";

export default function WeatherWidget() {
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

	return (
		<div className="text-white position-absolute">
			{clientCity}
			<br />
			{weatherInfo.weatherIcon} {weatherInfo.temperature}&nbsp;°C
		</div>
	);
}
