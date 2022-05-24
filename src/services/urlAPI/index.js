export const DOMAIN_NAME  = process.env.REACT_APP_BASE_URL;
export const STATUS_SUCCESS = 200;
export const STATUS_CREATE_SUCCESS = 201;

//ROOM
export const URL_GET_LIST_ROOM = `${DOMAIN_NAME}/room`;
export const URL_ADD_NEW_ROOM = `${DOMAIN_NAME}/room`;
export const URL_DELETE_ROOM= (MaPhong) => `${DOMAIN_NAME}/room/${MaPhong}`;

//TYPE ROOM
export const URL_GET_LIST_TYPE_ROOM = `${DOMAIN_NAME}/room-type`;

//STATE ROOM
export const URL_GET_LIST_STATE_ROOM = `${DOMAIN_NAME}/room-state`;

//TYPE CUSTOMER
export const URL_GET_LIST_TYPE_CUSTOMER = `${DOMAIN_NAME}/customer-type`;
export const URL_POST_TYPE_CUSTOMER = `${DOMAIN_NAME}/customer-type`;