import axios from "axios";

const API_URL = "https://freegeoip.app/json/";

const getClientLocationInfo = async () => {
	const { data } = await axios.get(API_URL);
	return { city: data.city, lat: data.latitude, lon: data.longitude };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getClientLocationInfo };
