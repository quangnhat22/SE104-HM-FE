import Axios from "axios";
import { URL_GET_CONFIG } from "./urlAPI";

export const ConfigService = {
    getListConfig: () => {
        return Axios.get(URL_GET_CONFIG);
    }
}