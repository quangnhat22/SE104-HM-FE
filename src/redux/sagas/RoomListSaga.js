import { toast } from 'react-toastify';
import {call, takeLatest, put} from 'redux-saga/effects';
import { RoomService } from "../../services/RoomService";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypes from "../constants/constant";
import { ADD_NEW_ROOM_SAGA, DELETE_ROOM_SAGA, EDIT_ROOM_SAGA, FETCH_LIST_ROOM_SAGA } from "../constants/constantSaga";

function * actFetchListRoom() {
    try {
        yield put({ type: ActionTypes.SHOW_LOADING });
        let {data, status} = yield call(()=> RoomService.getListRoom());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_ROOM_LIST,
                roomList: data
            })
        }
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
    catch (err) {
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
}

function * actNewRoom(action) {
    let {room} = action;
    try {
        let {status} = yield call(()=> RoomService.addNewRoom(room));
        if(status === STATUS_CREATE_SUCCESS) {
            yield put ({type: FETCH_LIST_ROOM_SAGA});
            toast.success("Thêm phòng thành công!");
        }
    }
    catch (err) {

    }
}

function * actDeleteRoom(action) {
    let {maPhong} = action;
    try {
        let {status} = yield call(()=> RoomService.deleteRoom(maPhong));
        if (status === STATUS_SUCCESS) {
            yield put ({type: FETCH_LIST_ROOM_SAGA});
            toast.success("Xóa phòng thành công!");
        }
    }
    catch (err) {

    }
}

function * actEditRoom(action) {
    let {editRoom} = action; 
    try {
        let {status} = yield call(()=> RoomService.editRoom(editRoom));
        if(status === STATUS_SUCCESS) {
            yield put ({type: FETCH_LIST_ROOM_SAGA});
            toast.success("Sửa thông tin phòng thành công!");
        } else {
            toast.error("Sửa phòng không thành công!");
        }
    } catch (err) {
        toast.error("Đã có lỗi xảy ra!");
    }
}

export function * followActFetchListRoom() {
    yield takeLatest(FETCH_LIST_ROOM_SAGA, actFetchListRoom);
}

export function * followActNewRoom() {
    yield takeLatest(ADD_NEW_ROOM_SAGA, actNewRoom);
}

export function * followActDeleteRoom() {
    yield takeLatest(DELETE_ROOM_SAGA, actDeleteRoom);
}

export function * followActEditRoom() {
    yield takeLatest(EDIT_ROOM_SAGA, actEditRoom);
}