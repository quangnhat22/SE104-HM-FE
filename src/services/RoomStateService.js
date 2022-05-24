import Axios from "axios";
import { URL_GET_LIST_STATE_ROOM } from "./urlAPI";

export const RoomStateService = {
    getListRoomState: () => {
        return Axios.get(
            URL_GET_LIST_STATE_ROOM
        )       
    },
}