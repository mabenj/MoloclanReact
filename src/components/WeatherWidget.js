import { useState, useEffect } from "react";
import locationService from "../services/locationService";
import weatherService from "../services/weatherService";

export default function WeatherWidget({ style }) {
	const [clientCity, setClientCity] = useState("");
	const [weatherInfo, setWeatherInfo] = useState({});
	const [isNight, setIsNight] = useState(false);

	useEffect(() => {
		async function fetchLocationAndWeather() {
			const { lat, lon, city } = await locationService.getClientLocationInfo();
			const weatherInfo = await weatherService.getWeatherInfo(lat, lon);
			setClientCity(city);
			setWeatherInfo(weatherInfo);
			const now = new Date();
			setIsNight(!isTimeBetween(now, weatherInfo.sunrise, weatherInfo.sunset));
		}
		fetchLocationAndWeather();
	}, []);

	if (!clientCity || !weatherInfo) {
		return null;
	}

	return (
		<div className="ml-3" style={style}>
			<span className="light-grey-color text-nowrap">
				{clientCity}&nbsp;&nbsp;&nbsp;
				{isNight ? weatherInfo.moonIcon : weatherInfo.weatherIcon}&nbsp;
				{weatherInfo.temperature}&nbsp;°C
			</span>
		</div>
	);
}

function isTimeBetween(date, timeString1, timeString2) {
	const minutes1 = getMinutesSinceMidNight(timeString1);
	const minutes2 = getMinutesSinceMidNight(timeString2);
	const dateMinutes = date.getHours() * 60 + date.getMinutes();
	return dateMinutes >= minutes1 && dateMinutes <= minutes2;
}

function getMinutesSinceMidNight(timeString) {
	const [time, AmPm] = timeString.split(" ");
	let [hours, minutes] = time.split(":");
	if (AmPm.toLowerCase() === "pm") {
		hours = parseInt(hours) + 12;
	}
	return parseInt(hours) * 60 + parseInt(minutes);
}
