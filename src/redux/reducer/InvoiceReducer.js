import * as ActionTypes from "../constants/constant";

const initialState = {
  invoiceList: [
    {
      MaHoaDon: "",
      KhachHang_CoQuan: "",
      DiaChi: "",
      NgayLap: "",
      TongTien: 0,
      DaXoa: 0,
      CTHD: [
        {
          STT: -1,
          MaPhieuThuePhong: "",
          MaHoaDon: "",
          SoNgayThue: 0,
          DonGia: "",
          DaXoa: false,
          ThanhTien: 0,
        },
      ],
    },
  ],
};

export const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_INVOICE_LIST:
      state.invoiceList = action.invoiceList;
      return { ...state };
    default:
      return { ...state };
  }
};
