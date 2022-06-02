import { toast } from 'react-toastify';
import {call, takeLatest, put, all} from 'redux-saga/effects';
import * as SagaActionTypes from "../../redux/constants/constantSaga";
import * as ActionTypes from "../../redux/constants/constant";

function * actFetchAllInforForRoom() {
    try {
        yield put ({type: ActionTypes.SHOW_LOADING})
        yield all([
            put({ type: SagaActionTypes.FETCH_LIST_ROOM_SAGA }),
            put({ type: SagaActionTypes.FECTH_LIST_TYPE_ROOM_SAGA }),
            put({ type: SagaActionTypes.FETCH_LIST_STATE_ROOM_SAGA }),
            put({ type: SagaActionTypes.GET_CONFIG_SAGA }),
            put({type: SagaActionTypes.FETCH_LIST_SURCHARGE_SAGA}),
            put({ type: SagaActionTypes.FETCH_LIST_TYPE_CUSTOMER_SAGA }),
        ])
        yield put ({type: ActionTypes.HIDE_LOADING})
    } catch (err) {
        toast.error("Đã có lỗi đã xảy ra");
    }
}

export function * followActFetchAllInforForRoom() {
    yield takeLatest(SagaActionTypes.FECTH_ALL_INFOR_FOR_ROOM, actFetchAllInforForRoom);
}