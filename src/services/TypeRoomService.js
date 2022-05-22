import Axios from "axios";
import { URL_GET_LIST_TYPE_ROOM } from "./urlAPI";

export const TypeRoomService = {
    getListTypeRoom: () => {
        return Axios.get(
            URL_GET_LIST_TYPE_ROOM
        )
    }
}