import { call, put, takeLatest } from "redux-saga/effects";
import { TypeRoomService } from "../../services/TypeRoomService";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import { ADD_TYPE_ROOM_SAGA, DELETE_TYPE_ROOM_SAGA, EDIT_TYPE_ROOM_SAGA, FECTH_LIST_TYPE_ROOM_SAGA } from "../constants/constantSaga";
import * as ActionTypes from "../constants/constant";
import { toast } from "react-toastify";

function * actFetchListTypeRoom() {
    try {
        yield put({ type: ActionTypes.SHOW_LOADING });
        let {data, status} = yield call (()=> TypeRoomService.getListTypeRoom());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_TYPE_ROOM,
                typeList: data
            })
        }
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
    catch(err) {
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
}

function * actAddTypeRoom(action) {
    let {newTypeRoom} = action;
    try {
        let {status} = yield call (()=> TypeRoomService.addTypeRoom(newTypeRoom));
        if(status === STATUS_CREATE_SUCCESS) {
            yield put({type: FECTH_LIST_TYPE_ROOM_SAGA});
            toast.success(`Thêm loại phòng ${newTypeRoom.TenLoaiPhong} thành công`);
        }
    }
    catch(err) {

    }
}

function * actEditTypeRoom(action) {
    let {typeRoom} = action;
    try {
        let {status} = yield call (()=> TypeRoomService.editListTypeRoom(typeRoom));
        if(status === STATUS_SUCCESS) {
            yield put({type: FECTH_LIST_TYPE_ROOM_SAGA});
            toast.success(`Cập nhập loại phòng có mã ${typeRoom.TenLoaiPhong} thành công`);
        }
    }
    catch(err) {

    }
}

function * actDeleteTypeRoom(action) {
    let {typeDelete} = action;
    try {
        let {status} = yield call (()=> TypeRoomService.deleteTypeRoom(typeDelete.MaLoaiPhong));
        if(status === STATUS_SUCCESS) {
            yield put({type: FECTH_LIST_TYPE_ROOM_SAGA});
            toast.success(`Xoá loại phòng ${typeDelete.TenLoaiPhong} thành công`);
        }
    }
    catch(err) {

    }
}


export function * followActFetchListTypeRoom() {
    yield takeLatest(FECTH_LIST_TYPE_ROOM_SAGA, actFetchListTypeRoom);
}

export function * followActAddTypeRoom() {
    yield takeLatest(ADD_TYPE_ROOM_SAGA, actAddTypeRoom);
}

export function * followActEditTypeRoom() {
    yield takeLatest(EDIT_TYPE_ROOM_SAGA, actEditTypeRoom);
}

export function * followActDeleteTypeRoom() {
    yield takeLatest(DELETE_TYPE_ROOM_SAGA, actDeleteTypeRoom);
}