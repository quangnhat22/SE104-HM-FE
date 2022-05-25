import Axios from "axios";
import { URL_GET_REPORT } from "./urlAPI";
export const ReportService = {
    getReport: (thang, nam) => {
        return Axios.get(URL_GET_REPORT(thang,nam));
      },
}