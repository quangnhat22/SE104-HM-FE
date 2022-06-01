import * as ActionTypes from "../constants/constant";

const initialState = {
  reportList: [
    {
      MaBaoCao: "",
      Thang: 1,
      Nam: 2022,
      TongDoanhThu: "0",
      DaXoa: false,
      ReportDetails: [],
    },
  ],
};

export const ReportInYearReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_REPORT_IN_YEAR:
      state.reportList = action.reportList;
      return { ...state };

    default:
      return state;
  }
};
