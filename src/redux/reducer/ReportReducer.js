import * as ActionTypes from "../constants/constant";

const initialState = {
    report: {
      MaBaoCao: "",
      Thang: 2,
      Nam: 2022,
      TongDoanhThu: "",
      DaXoa: false,
      ReportDetails: [
          {
              MaBaoCao: "",
              MaLoaiPhong: "",
              DoanhThuTheoThang: 0,
              TiLe: 1,
              DaXoa: false,
              RatePercent: 1,
              RoomType: {
                  MaLoaiPhong: "",
                  TenLoaiPhong: "",
                  DonGia: "",
                  DaXoa: false
              }
          }
      ]
  }
}

export const ReportReducer = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.GET_REPORT:
    state.report = action.report;
    return { ...state }

  default:
    return state
  }
}
