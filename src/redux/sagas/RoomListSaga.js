import {call, takeLatest, put} from 'redux-saga/effects';
import { RoomService } from "../../services/RoomService";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import { GET_ROOM_LIST } from "../constants/constant";
import { ADD_NEW_ROOM_SAGA, FETCH_LIST_ROOM_SAGA } from "../constants/constantSaga";

function * actFetchListRoom() {
    try {
        let {data, status} = yield call(()=> RoomService.getListRoom());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: GET_ROOM_LIST,
                roomList: data
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

function * actNewRoom(action) {
    try {
        
    }
    catch (err) {

    }
}

export function * followActFetchListRoom() {
    yield takeLatest(FETCH_LIST_ROOM_SAGA, actFetchListRoom);
}

export function * followActNewRoom() {
    yield takeLatest(ADD_NEW_ROOM_SAGA, actNewRoom);
}