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
  rentDetail: {
    MaPhieuThuePhong: "",
    NgayBatDauThue: "",
    MaPhong: "",
    SoKhach: 0,
    DonGiaThueTrenNgay: "0",
    DaXoa: false,
    Room: {
      MaPhong: "",
      TenPhong: "",
      MaLoaiPhong: "",
      GhiChu: null,
      MaTinhTrang: "",
      DaXoa: false,
      RoomType: {
        MaLoaiPhong: "",
        TenLoaiPhong: "",
        DonGia: "0",
        DaXoa: false,
      },
    },
    InvoiceDetail: {
      MaPhieuThuePhong: "",
      MaHoaDon: "",
      SoNgayThue: 0,
      DonGia: "0",
      DaXoa: false,
      Invoice: {
        MaHoaDon: "",
        KhachHang_CoQuan: "",
        DiaChi: "",
        NgayLap: "",
        TongTien: 0,
        DaXoa: false,
      },
    },
    VoucherDetails: [
      {
        MaCTPhieuThuePhong: "",
        MaPhieuThuePhong: "",
        CMND: "",
        TenKhachHang: "",
        DiaChi: "",
        MaLoaiKhach: "",
        DaXoa: false,
        CustomerType: {
          MaLoaiKhach: "",
          TenLoaiKhach: "",
          HeSoPhuThu: 1,
          DaXoa: false,
        },
      },
    ],
  },
};

export const RentVoucherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RENT_VOUCHER_LIST:
      state.rentList = action.rentList;
      return { ...state };
    case ActionTypes.GET_RENT_VOUCHER_DETAIL:
      state.rentDetail = action.rentDetail;
      return { ...state };
    default:
      return { ...state };
  }
};
