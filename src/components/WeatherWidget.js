import React, { useState, useEffect } from "react";
import locationService from "../services/locationService";
import weatherService from "../services/weatherService";

export default function WeatherWidget() {
	/*
	const [clientCity, setClientCity] = useState("");
	const [weatherCelsius, setWeatherCelsius] = useState(0);

	useEffect(() => {
		async function fetchLocationAndWeather() {
			var locationInfo = await locationService.getClientLocationInfo();
			var weatherInfo = await weatherService.getWeatherInfo(
				locationInfo.lat,
				locationInfo.lon
			);
			setClientCity(locationInfo.city);
			setWeatherCelsius(weatherInfo.temperature);
		}
		fetchLocationAndWeather();
	});*/

	return (
		<div className="text-white position-absolute">
			{/* {clientCity}, {weatherCelsius}&nbsp;°C */}
		</div>
	);
}
