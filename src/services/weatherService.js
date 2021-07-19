import axios from "axios";

const API_URL_TEMPLATE =
	"https://fcc-weather-api.glitch.me/api/current?lat={latitude}&lon={longitude}";

const getWeatherInfo = async (latitude, longitude) => {
	const { data } = await axios.get(createApiUrl(latitude, longitude));
	return { temperature: data.main.temp };
};

const createApiUrl = (latitude, longitude) => {
	return API_URL_TEMPLATE.replace("{latitude}", latitude).replace(
		"{longitude}",
		longitude
	);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getWeatherInfo };
