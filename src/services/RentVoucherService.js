import Axios from "axios";
import { URL_ADD_NEW_RENT_VOUCHER, URL_GET_RENT_VOUCHER, URL_GET_RENT_VOUCHER_BY_KEY } from "./urlAPI";

export const RentVoucherService = {
    getRentVoucherList: () => {
        return Axios.get(URL_GET_RENT_VOUCHER);
    },
    addNewRentVoucher: (newRentVoucher) => {
        return Axios.post(URL_ADD_NEW_RENT_VOUCHER, newRentVoucher);
    },
    getRentVoucherDetail: (MaPhieuThuePhong) => {
        return Axios.get(URL_GET_RENT_VOUCHER_BY_KEY(MaPhieuThuePhong));
    }
}