import { call, put, takeLatest } from "redux-saga/effects";
import { TypeRoomService } from "../../services/TypeRoomService";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import { ADD_TYPE_ROOM_SAGA, DELETE_TYPE_ROOM_SAGA, EDIT_TYPE_ROOM_SAGA, FECTH_LIST_TYPE_ROOM_SAGA } from "../constants/constantSaga";
import * as ActionTypes from "../constants/constant";
import { toast } from "react-toastify";

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

function * actAddTypeRoom(action) {
    let {newTypeRoom} = action;
    try {
        let {status} = yield call (()=> TypeRoomService.addTypeRoom(newTypeRoom));
        console.log("status: ", status);
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
        console.log("status: ", status);
        if(status === STATUS_SUCCESS) {
            yield put({type: FECTH_LIST_TYPE_ROOM_SAGA});
            toast.success(`Cập nhập loại phòng có mã ${typeRoom.MaLoaiPhong} thành công`);
        }
    }
    catch(err) {

    }
}

function * actDeleteTypeRoom(action) {
    let {maLoaiPhong} = action;
    try {
        let {status} = yield call (()=> TypeRoomService.deleteTypeRoom(maLoaiPhong));
        console.log("status: ", status);
        if(status === STATUS_SUCCESS) {
            yield put({type: FECTH_LIST_TYPE_ROOM_SAGA});
            toast.success(`Xoá loại phòng có mã ${maLoaiPhong} thành công`);
        }
    }
    catch(err) {

    }
}


export function * followActFetchListTypeRoom() {
    yield takeLatest(FECTH_LIST_TYPE_ROOM_SAGA, actFetchListTypeRoom)
}

export function * followActAddTypeRoom() {
    yield takeLatest(ADD_TYPE_ROOM_SAGA, actAddTypeRoom)
}

export function * followActEditTypeRoom() {
    yield takeLatest(EDIT_TYPE_ROOM_SAGA, actEditTypeRoom)
}

export function * followActDeleteTypeRoom() {
    yield takeLatest(DELETE_TYPE_ROOM_SAGA, actDeleteTypeRoom)
}