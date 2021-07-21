import axios from "axios";

// eslint-disable-next-line no-unused-vars
const API_URL_TEMPLATE =
	"https://fcc-weather-api.glitch.me/api/current?lat={latitude}&lon={longitude}";
const API_URL_TEMPLATE2 = "https://wttr.in/{latitude},{longitude}?format=j1";

const getWeatherInfo = async (latitude, longitude) => {
	const { data } = await axios.get(createApiUrl(latitude, longitude));
	return {
		temperature: data.current_condition[0].temp_C,
		weatherIcon: getWeatherIcon(data.current_condition[0].weatherCode)
	};
};

const createApiUrl = (latitude, longitude) => {
	return API_URL_TEMPLATE2.replace("{latitude}", latitude).replace(
		"{longitude}",
		longitude
	);
};

const getWeatherIcon = (weatherCode) => {
	const weatherString = WWO_CODE[weatherCode];
	const weatherIcon = WEATHER_SYMBOL[weatherString];
	return weatherIcon ? weatherIcon : WEATHER_SYMBOL["Unknown"];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getWeatherInfo };

// https://github.com/chubin/wttr.in/blob/master/lib/constants.py
const WWO_CODE = {
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

const WEATHER_SYMBOL = {
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

// eslint-disable-next-line no-unused-vars
const MOON_PHASES = ("🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘");
