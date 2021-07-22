/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "https://freegeoip.app/json/";
const API_URL2 = "http://ip-api.com/json";
const API_URL3 = "https://ipapi.co/json/";
const API_URL4 = "https://ipwhois.app/json/";

const getClientLocationInfo = async () => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
		// coords are Turku
		return { city: "St. Testania", lat: 60.447, lon: 22.26 };
	}
	const { data } = await axios.get(API_URL3);
	return { city: data.city, lat: data.latitude, lon: data.longitude };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getClientLocationInfo };
