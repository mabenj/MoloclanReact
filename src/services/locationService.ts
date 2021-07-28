/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import sessionStorageService from "../services/sessionStorageService";

const API_URL = "https://freegeoip.app/json/";
const API_URL2 = "http://ip-api.com/json";
const API_URL3 = "https://ipapi.co/json/";
const API_URL4 = "https://ipwhois.app/json/";
const API_URL5 = "https://www.geoplugin.net/json.gp";

const STORAGE_KEY = "molo_loc_info";

export interface ILocationInfo {
	city: string;
	lat: number;
	lon: number;
}

const getClientLocationInfo = async (): Promise<ILocationInfo> => {
	const stored = sessionStorageService.getItemOrNull(STORAGE_KEY);
	if (stored) {
		return stored as ILocationInfo;
	}

	const { data } = await axios.get(API_URL4);
	const locationInfo: ILocationInfo = {
		city: data.city,
		lat: data.latitude,
		lon: data.longitude
	};
	sessionStorageService.setItem(STORAGE_KEY, locationInfo);
	return locationInfo;
};

const locationService = { getClientLocationInfo };
export default locationService;
