import Axios from "axios";
import { URL_ADD_TYPE_CUSTOMER, URL_DELETE_TYPE_CUSTOMER, URL_EDIT_TYPE_CUSTOMER, URL_GET_LIST_TYPE_CUSTOMER } from "./urlAPI";

export const TypeCustomerService = {
    getListTypeCustomer: () => {
        return Axios.get(
            URL_GET_LIST_TYPE_CUSTOMER
        )
    },
    addTypeCustomer: (typeCustomer) => {
        return Axios.post(
            URL_ADD_TYPE_CUSTOMER,
            {
                TenLoaiKhach: typeCustomer.TenLoaiKhach,
                HeSoPhuThu: typeCustomer.HeSoPhuThu
            }
        )
    },
    editTypeCustomer: (typeCustomer) => {
        return Axios.put(
            URL_EDIT_TYPE_CUSTOMER(typeCustomer.MaLoaiKhach), {
                TenLoaiKhach: typeCustomer.TenLoaiKhach,
                HeSoPhuThu: typeCustomer.HeSoPhuThu
            }
        )
    },
    deleteTypeCustomer: (MaLoaiKhach) => {
        return Axios.delete(URL_DELETE_TYPE_CUSTOMER(MaLoaiKhach))
    }
}