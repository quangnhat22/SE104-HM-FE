import { toast } from 'react-toastify';
import {call, takeLatest, put} from 'redux-saga/effects';
import { RoomStateService } from '../../services/RoomStateService';
import { STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";

function * actFetchListStateRoom() {
    try {
        let {data, status} = yield call(()=> RoomStateService.getListRoomState());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_ROOM_STATE_LIST,
                roomStateList: data
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

export function * followFecthStateRoomList() {
    yield takeLatest(SagaActionTypes.FETCH_LIST_STATE_ROOM_SAGA,actFetchListStateRoom);
}