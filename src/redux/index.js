import { applyMiddleware, combineReducers, createStore } from "redux";
import customizationReducer from "./customizationReducer";
import createMiddlewareSaga from 'redux-saga';
import rootSaga from "./sagas/rootSaga";
import { UserReducer } from "./reducer/UserReducer";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    customization: customizationReducer,
    UserReducer,
  });

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export { store };
