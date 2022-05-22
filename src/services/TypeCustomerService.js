import Axios from "axios";
import { URL_GET_LIST_TYPE_CUSTOMER } from "./urlAPI";

export const TypeCustomerService = {
    getListTypeCustomer: () => {
        return Axios.get(
            URL_GET_LIST_TYPE_CUSTOMER
        )
    }
}