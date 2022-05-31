import Axios from "axios";
import { URL_GET_LIST_USER_GROUP } from "./urlAPI";

export const UserGroupService = {
  getListUserGroup: () => {
    return Axios.get(URL_GET_LIST_USER_GROUP);
  },
};
