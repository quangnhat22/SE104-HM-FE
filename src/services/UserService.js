import Axios from "axios";
import {
  URL_ADD_NEW_USER,
  URL_DELETE_USER,
  URL_EDIT_USER,
  URL_FORGOT_PASSWORD,
  URL_GET_LIST_USER,
  URL_POST_LOGIN,
  URL_RESET_PASSWORD,
} from "./urlAPI";

export const UserService = {
  postLogin: (user) => {
    return Axios.post(URL_POST_LOGIN, user);
  },
  getListUser: () => {
    return Axios.get(URL_GET_LIST_USER);
  },
  addNewUser: (user) => {
    return Axios.post(URL_ADD_NEW_USER, {
      HoTen: user.HoTen,
      Email: user.Email,
      MaNhom: user.MaNhom,
    });
  },
  editUser: (user) => {
    return Axios.put(URL_EDIT_USER(user.MaNguoiDung), {
      HoTen: user.HoTen,
      Email: user.Email,
      MaNhom: user.MaNhom,
    });
  },
  deleteUser: (MaNguoiDung) => {
    return Axios.delete(URL_DELETE_USER(MaNguoiDung));
  },
  forgotPassword: (email) => {
    return Axios.post(URL_FORGOT_PASSWORD, email);
  },
  resetPassword: (resetContent) => {
    return Axios.post(URL_RESET_PASSWORD, resetContent);
  },
};
