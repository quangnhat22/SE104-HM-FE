import Axios from "axios";
import { URL_GET_LIST_TYPE_CUSTOMER, URL_POST_TYPE_CUSTOMER } from "./urlAPI";

export const TypeCustomerService = {
    getListTypeCustomer: () => {
        return Axios.get(
            URL_GET_LIST_TYPE_CUSTOMER
        )
    },
    postRoomTypeCustomer: (typeCustomer) => {
        return Axios.post(
            URL_POST_TYPE_CUSTOMER,
            {
                "TenLoaiKhach": typeCustomer["TenLoaiKhach"],
                "HeSoPhuThu": typeCustomer["HeSoPhuThu"]
            }
        )
    }
}