import Axios from "axios";
import {
  URL_GET_REPORT,
  URL_GET_REPORT_EXCEL,
  URL_GET_REPORT_IN_YEAR,
} from "./urlAPI";
export const ReportService = {
  getReport: (thang, nam) => {
    return Axios.get(URL_GET_REPORT(thang, nam));
  },

  getReportInYear: () => {
    return Axios.get(URL_GET_REPORT_IN_YEAR);
  },

  getReportExcel: (thang, nam) => {
    return Axios.get(URL_GET_REPORT_EXCEL(thang, nam), {
      responseType: "blob",
    });
  },
};
