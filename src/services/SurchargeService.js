import Axios from "axios";
import { URL_GET_LIST_SURCHARGE } from "./urlAPI";


export const SurchargeService = {
    getListSurcharge: () => {
        return Axios.get(URL_GET_LIST_SURCHARGE);
    }
}