import React, { useState, useEffect } from "react";
import locationService from "../services/locationService";
import weatherService from "../services/weatherService";

export default function WeatherWidget({ className, style }) {
	const [clientCity, setClientCity] = useState("");
	const [weatherInfo, setWeatherInfo] = useState({});

	useEffect(() => {
		async function fetchLocationAndWeather() {
			const { lat, lon, city } = await locationService.getClientLocationInfo();
			const weatherInfo = await weatherService.getWeatherInfo(lat, lon);
			setClientCity(city);
			setWeatherInfo(weatherInfo);
		}
		fetchLocationAndWeather();
	}, []);

	if (!clientCity || !weatherInfo) {
		return null;
	}

	return (
		<div className={`ml-3 ${className}`} style={style}>
			<span className="light-grey-color text-nowrap">
				{clientCity}&nbsp;&nbsp;&nbsp;{weatherInfo.weatherIcon}&nbsp;
				{weatherInfo.temperature}&nbsp;°C
			</span>
		</div>
	);
}
