import axios from "axios";
import sessionStorageService from "../services/sessionStorageService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_URL_TEMPLATE =
	"https://fcc-weather-api.glitch.me/api/current?lat={latitude}&lon={longitude}";
const API_URL_TEMPLATE2 = "https://wttr.in/{latitude},{longitude}?format=j1";
const API_URL_TEMPLATE3 = "https://wttr.in/?format=j1";

const STORAGE_KEY = "molo_weather_info";

export interface IWeatherInfo {
	description: string;
	temperature: number;
	weatherSymbol: string;
	weatherImage: string;
	moonIcon: string;
	sunrise: string;
	sunset: string;
	area: string;
}

const getWeatherInfo = async (
	latitude: number,
	longitude: number
): Promise<IWeatherInfo> => {
	const stored = sessionStorageService.getItemOrNull(STORAGE_KEY);
	if (stored) {
		return stored as IWeatherInfo;
	}

	const { data } = await axios.get(createApiUrl(latitude, longitude));
	const weatherInfo: IWeatherInfo = {
		description: WWO_CODE[data.current_condition[0].weatherCode],
		temperature: data.current_condition[0].temp_C,
		weatherSymbol: getWeatherSymbol(data.current_condition[0].weatherCode),
		weatherImage: getWeatherImage(data.current_condition[0].weatherCode),
		moonIcon:
			MOON_PHASES[data.weather[0].astronomy[0].moon_phase.toLowerCase()],
		sunrise: data.weather[0]?.astronomy[0]?.sunrise,
		sunset: data.weather[0]?.astronomy[0]?.sunset,
		area: data.nearest_area[0].areaName[0].value
	};
	sessionStorageService.setItem(STORAGE_KEY, weatherInfo);
	return weatherInfo;
};

const createApiUrl = (latitude: number, longitude: number): string => {
	if (!latitude || !longitude) {
		return API_URL_TEMPLATE3;
	}
	return API_URL_TEMPLATE2.replace("{latitude}", latitude.toString()).replace(
		"{longitude}",
		longitude.toString()
	);
};

const getWeatherSymbol = (weatherCode: number): string => {
	const weatherString = WWO_CODE[weatherCode];
	const weatherIcon = WEATHER_SYMBOL[weatherString];
	return weatherIcon ? weatherIcon : WEATHER_SYMBOL["Unknown"];
};

const getWeatherImage = (weatherCode: number): string => {
	const weatherString = WWO_CODE[weatherCode];
	return WEATHER_IMAGE[weatherString];
};

const weatherService = { getWeatherInfo };
export default weatherService;

// https://github.com/chubin/wttr.in/blob/master/lib/constants.py
const WWO_CODE: { [key: number]: string } = {
	113: "Sunny",
	116: "PartlyCloudy",
	119: "Cloudy",
	122: "VeryCloudy",
	143: "Fog",
	176: "LightShowers",
	179: "LightSleetShowers",
	182: "LightSleet",
	185: "LightSleet",
	200: "ThunderyShowers",
	227: "LightSnow",
	230: "HeavySnow",
	248: "Fog",
	260: "Fog",
	263: "LightShowers",
	266: "LightRain",
	281: "LightSleet",
	284: "LightSleet",
	293: "LightRain",
	296: "LightRain",
	299: "HeavyShowers",
	302: "HeavyRain",
	305: "HeavyShowers",
	308: "HeavyRain",
	311: "LightSleet",
	314: "LightSleet",
	317: "LightSleet",
	320: "LightSnow",
	323: "LightSnowShowers",
	326: "LightSnowShowers",
	329: "HeavySnow",
	332: "HeavySnow",
	335: "HeavySnowShowers",
	338: "HeavySnow",
	350: "LightSleet",
	353: "LightShowers",
	356: "HeavyShowers",
	359: "HeavyRain",
	362: "LightSleetShowers",
	365: "LightSleetShowers",
	368: "LightSnowShowers",
	371: "HeavySnowShowers",
	374: "LightSleetShowers",
	377: "LightSleet",
	386: "ThunderyShowers",
	389: "ThunderyHeavyRain",
	392: "ThunderySnowShowers",
	395: "HeavySnowShowers"
};

const WEATHER_SYMBOL: { [key: string]: string } = {
	Unknown: "✨",
	Cloudy: "☁️",
	Fog: "🌫",
	HeavyRain: "🌧",
	HeavyShowers: "🌧",
	HeavySnow: "❄️",
	HeavySnowShowers: "❄️",
	LightRain: "🌦",
	LightShowers: "🌦",
	LightSleet: "🌧",
	LightSleetShowers: "🌧",
	LightSnow: "🌨",
	LightSnowShowers: "🌨",
	PartlyCloudy: "⛅️",
	Sunny: "☀️",
	ThunderyHeavyRain: "🌩",
	ThunderyShowers: "⛈",
	ThunderySnowShowers: "⛈",
	VeryCloudy: "☁️"
};

// https://www.ilmatieteenlaitos.fi/saamerkkien-selitykset
const WEATHER_IMAGE: { [key: string]: string } = {
	Cloudy: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/7.svg",
	Fog: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/9.svg",
	HeavyRain: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/39.svg",
	HeavyShowers: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/39.svg",
	HeavySnow: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/59.svg",
	HeavySnowShowers: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/59.svg",
	LightRain: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/37.svg",
	LightShowers: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/37.svg",
	LightSleet: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/47.svg",
	LightSleetShowers: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/47.svg",
	LightSnow: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/57.svg",
	LightSnowShowers: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/57.svg",
	PartlyCloudy: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/4.svg",
	Sunny: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/1.svg",
	ThunderyHeavyRain: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/77.svg",
	ThunderyShowers: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/77.svg",
	ThunderySnowShowers:
		"https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/77.svg",
	VeryCloudy: "https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/7.svg"
};

const MOON_PHASES: { [key: string]: string } = {
	new: "🌑",
	"new moon": "🌑",
	"waxing crescent": "🌒",
	"first quarter": "🌓",
	"waxing gibbous": "🌔",
	full: "🌕",
	"full moon": "🌕",
	"waning gibbous": "🌖",
	"third quarter": "🌗",
	"last quarter": "🌗",
	"waning crescent": "🌘"
};
