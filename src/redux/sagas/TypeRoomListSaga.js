import { call, put, takeLatest } from "redux-saga/effects";
import { TypeRoomService } from "../../services/TypeRoomService";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import { FECTH_LIST_TYPE_ROOM_SAGA, FETCH_LIST_ROOM_SAGA } from "../constants/constantSaga";
import * as ActionTypes from "../constants/constant";

function * actFetchListTypeRoom() {
    try {
        let {data, status} = yield call (()=> TypeRoomService.getListTypeRoom());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_TYPE_ROOM,
                typeList: data
            })
        }
    }
    catch(err) {

    }
}

export function * followActFetchListTypeRoom() {
    yield takeLatest(FECTH_LIST_TYPE_ROOM_SAGA, actFetchListTypeRoom)
}