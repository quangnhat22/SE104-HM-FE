import Axios from "axios";
import { URL_GET_CONFIG, URL_UPDATE_CONFIG } from "./urlAPI";

export const ConfigService = {
    getListConfig: () => {
        return Axios.get(URL_GET_CONFIG);
    },
    updateConfig: (maThamSo, giaTri) => {
        return Axios.put(
            URL_UPDATE_CONFIG(maThamSo),
            {
                GiaTri: giaTri
            }
        )
    }
}