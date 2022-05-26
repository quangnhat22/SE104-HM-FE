import Axios from "axios";
import { URL_GET_RENT_VOUCHER } from "./urlAPI";

export const RentVoucherService = {
    getRentVoucherList: () => {
        return Axios.get(URL_GET_RENT_VOUCHER);
    }
}