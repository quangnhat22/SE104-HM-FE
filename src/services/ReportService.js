import Axios from "axios";
import { URL_GET_REPORT, URL_GET_REPORT_EXCEL } from "./urlAPI";
export const ReportService = {
    getReport: (thang, nam) => {
        return Axios.get(URL_GET_REPORT(thang,nam));
      },

    getReportExcel: (thang, nam) => {
      return Axios.get(URL_GET_REPORT_EXCEL(thang,nam));
    }
}