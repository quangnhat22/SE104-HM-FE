import Axios from "axios";
import { URL_GET_LIST_INVOICES } from "./urlAPI";

export const InvoiceService = {
    getListInvoice: () => {
        return Axios.get(URL_GET_LIST_INVOICES)
    }
}