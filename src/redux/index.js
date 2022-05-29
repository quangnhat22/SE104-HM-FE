import { applyMiddleware, combineReducers, createStore } from "redux";
import customizationReducer from "./customizationReducer";
import createMiddlewareSaga from 'redux-saga';
import rootSaga from "./sagas/rootSaga";
import { UserReducer } from "./reducer/UserReducer";
import {RoomReducer} from "./reducer/RoomReducer";
import { LoadingReducer } from "./reducer/LoadingReducer";
import {TypeRoomReducer} from "./reducer/TypeRoomReducer";
import {TypeCustomerReducer} from "./reducer/TypeCustomerReducer";
import {RoomStateReducer} from "./reducer/RoomStateReducer";
import { ReportReducer } from "./reducer/ReportReducer";
import {InvoiceReducer} from "./reducer/InvoiceReducer";
import { RentVoucherReducer } from "./reducer/RentVoucherReducer";
import {InvoiceReducerLocal} from "./reducer/InvoiceReducerLocal";
import {SurchargeReducer} from "./reducer/SurchargeReducer";
import { CustomerReducerLocal } from "./reducer/CustomerReducerLocal";
import { ConfigReducer } from "./reducer/ConfigReducer";

const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
    customization: customizationReducer,
    UserReducer,
    RoomReducer,
    RoomStateReducer,
    LoadingReducer,
    TypeRoomReducer,
    TypeCustomerReducer,
    ReportReducer,
    InvoiceReducer,
    RentVoucherReducer,
    InvoiceReducerLocal,
    SurchargeReducer,
    CustomerReducerLocal,
    ConfigReducer
  });

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export { store };
