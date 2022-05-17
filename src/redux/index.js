import { applyMiddleware, combineReducers, createStore } from "redux";
import customizationReducer from "./customizationReducer";
import createMiddlewareSaga from 'redux-saga';
import rootSaga from "./sagas/rootSaga";
import { UserReducer } from "./reducer/UserReducer";
import {RoomReducer} from "./reducer/RoomReducer";
import { LoadingReducer } from "./reducer/LoadingReducer";
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    customization: customizationReducer,
    UserReducer,
    RoomReducer,
    LoadingReducer,
  });

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export { store };
