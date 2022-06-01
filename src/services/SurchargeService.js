import Axios from "axios";
import { URL_ADD_SURCHARGE, URL_DELETE_SURCHARGE, URL_GET_LIST_SURCHARGE, URL_UPDATE_SURCHARGE } from "./urlAPI";

export const SurchargeService = {
  getListSurcharge: () => {
    return Axios.get(URL_GET_LIST_SURCHARGE);
  },
  addSurcharge: (SoKhach, TyLePhuThu) => {
    return Axios.post(URL_ADD_SURCHARGE(SoKhach), {
      TiLePhuThu: TyLePhuThu,
    });
  },
  updateSurcharge: (SoKhach, TiLePhuThu) => {
    return Axios.put(URL_UPDATE_SURCHARGE(SoKhach), {
      TiLePhuThu: TiLePhuThu,
    });
  },
  deleteSurcharge: (SoKhach) => {
      return Axios.delete(URL_DELETE_SURCHARGE(SoKhach));
  }
};
