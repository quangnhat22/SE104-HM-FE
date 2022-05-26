import * as ActionTypes from "../constants/constant";

const initialState = {
  rentList: [
    {
      STT: -1,
      TenPhong: "",
      MaPhieuThuePhong: "",
      NgayBatDauThue: "",
      MaPhong: "",
      SoKhach: 2,
      DonGiaThueTrenNgay: "",
      DaXoa: 0,
      Phong: {
        MaPhong: "",
        TenPhong: "",
        MaLoaiPhong: "",
        GhiChu: null,
        MaTinhTrang: "",
        DaXoa: 0,
        LoaiPhong: {
          MaLoaiPhong: "",
          TenLoaiPhong: "",
          DonGia: "",
          DaXoa: 0,
        },
      },
      CTPhieuThuePhong: [
        {
          MaCTPhieuThuePhong: "",
          MaPhieuThuePhong: "",
          CMND: null,
          TenKhachHang: "",
          DiaChi: "",
          MaLoaiKhach: "",
          DaXoa: false,
        },
        {
          MaCTPhieuThuePhong: "",
          MaPhieuThuePhong: "",
          CMND: "",
          TenKhachHang: "",
          DiaChi: "",
          MaLoaiKhach: "",
          DaXoa: false,
        },
      ],
    },
  ],
};

export const RentVoucherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RENT_VOUCHER_LIST:
      state.rentList = action.rentList;
      return { ...state };
    default:
      return { ...state };
  }
};
