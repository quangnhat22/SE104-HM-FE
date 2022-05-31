import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddlewareSaga from "redux-saga";
import customizationReducer from "./customizationReducer";
import { CustomerReducerLocal } from "./reducer/CustomerReducerLocal";
import { InvoiceReducer } from "./reducer/InvoiceReducer";
import { InvoiceReducerLocal } from "./reducer/InvoiceReducerLocal";
import { LoadingReducer } from "./reducer/LoadingReducer";
import { RentVoucherReducer } from "./reducer/RentVoucherReducer";
import { ReportReducer } from "./reducer/ReportReducer";
import { RoomReducer } from "./reducer/RoomReducer";
import { RoomStateReducer } from "./reducer/RoomStateReducer";
import { SurchargeReducer } from "./reducer/SurchargeReducer";
import { TypeCustomerReducer } from "./reducer/TypeCustomerReducer";
import { TypeRoomReducer } from "./reducer/TypeRoomReducer";
import { UserGroupReducer } from "./reducer/UserGroupReducer";
import { UserReducer } from "./reducer/UserReducer";
import rootSaga from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
  customization: customizationReducer,
  UserReducer,
  UserGroupReducer,
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
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export { store };

