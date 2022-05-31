import * as ActionTypes from "../constants/constant";

const initialState = {
  userGroupList: [
    {
      MaNhom: "",
      TenNhom: "",
      CapBac: 0,
    },
  ],
};

export const UserGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_GROUP_LIST:
      state.userGroupList = action.userGroupList;
      return { ...state };
    default:
      return { ...state };
  }
};
