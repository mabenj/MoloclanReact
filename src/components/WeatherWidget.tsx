import { useState, useEffect } from "react";
import locationService from "../services/locationService";
import weatherService, { IWeatherInfo } from "../services/weatherService";

const WeatherWidget = ({ style }: { style: React.CSSProperties }) => {
	const [clientArea, setClientArea] = useState("");
	const [weatherInfo, setWeatherInfo] = useState<IWeatherInfo>(
		{} as IWeatherInfo
	);
	const [isNight, setIsNight] = useState(false);

	useEffect(() => {
		async function fetchLocationAndWeather() {
			const { lat, lon, city } = await locationService.getClientLocationInfo();
			const weatherInfo = await weatherService.getWeatherInfo(lat, lon);
			setClientArea(city || weatherInfo.area);
			setWeatherInfo(weatherInfo);
			const now = new Date();
			setIsNight(!isTimeBetween(now, weatherInfo.sunrise, weatherInfo.sunset));
		}
		fetchLocationAndWeather();
	}, []);

	if (!clientArea || !weatherInfo) {
		return null;
	}

	return (
		<div className="ml-3" style={style}>
			<span
				className="light-grey-color text-nowrap"
				style={{ display: "flex", alignItems: "center" }}>
				{clientArea}&nbsp;&nbsp;&nbsp;
				{isNight && weatherInfo.description === "Sunny" ? (
					weatherInfo.moonIcon
				) : (
					<img
						src={weatherInfo.weatherImage}
						alt={weatherInfo.description}
						width={20}
					/>
				)}
				&nbsp;
				{weatherInfo.temperature}&nbsp;°C
			</span>
		</div>
	);
};

function isTimeBetween(
	date: Date,
	timeString1: string,
	timeString2: string
): boolean {
	const minutes1 = getMinutesSinceMidNight(timeString1);
	const minutes2 = getMinutesSinceMidNight(timeString2);
	const dateMinutes = date.getHours() * 60 + date.getMinutes();
	return dateMinutes >= minutes1 && dateMinutes <= minutes2;
}

function getMinutesSinceMidNight(timeString: string): number {
	const [time, AmPm] = timeString.split(" ");
	let [hours, minutes] = time.split(":");
	if (AmPm.toLowerCase() === "pm") {
		hours = (parseInt(hours) + 12).toString();
	}
	return parseInt(hours) * 60 + parseInt(minutes);
}

export default WeatherWidget;
