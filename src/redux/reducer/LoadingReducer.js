import * as ActionTypes from "../constants/constant";
const initialState = {
    loading: false,
}

export const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {

    case ActionTypes.SHOW_LOADING:
        state.loading = true
        return { ...state}
    case ActionTypes.HIDE_LOADING:
        state.loading = false
        return { ...state }
    default:
        return { ...state }
  }
}
