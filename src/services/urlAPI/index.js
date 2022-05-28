export const DOMAIN_NAME  = process.env.REACT_APP_BASE_URL;
export const STATUS_SUCCESS = 200;
export const STATUS_CREATE_SUCCESS = 201;

//ROOM
export const URL_GET_LIST_ROOM = `${DOMAIN_NAME}/room`;
export const URL_ADD_NEW_ROOM = `${DOMAIN_NAME}/room`;
export const URL_EDIT_ROOM = (MaPhong) => `${DOMAIN_NAME}/room/${MaPhong}`;
export const URL_DELETE_ROOM= (MaPhong) => `${DOMAIN_NAME}/room/${MaPhong}`;

//TYPE ROOM
export const URL_GET_LIST_TYPE_ROOM = `${DOMAIN_NAME}/room-type`;
export const URL_ADD_TYPE_ROOM = `${DOMAIN_NAME}/room-type`;
export const URL_EDIT_TYPE_ROOM = (MaLoaiPhong) => `${DOMAIN_NAME}/room-type/${MaLoaiPhong}`;
export const URL_DELETE_TYPE_ROOM = (MaLoaiPhong) => `${DOMAIN_NAME}/room-type/${MaLoaiPhong}`;

//STATE ROOM
export const URL_GET_LIST_STATE_ROOM = `${DOMAIN_NAME}/room-state`;

//TYPE CUSTOMER
export const URL_GET_LIST_TYPE_CUSTOMER = `${DOMAIN_NAME}/customer-type`;
export const URL_ADD_TYPE_CUSTOMER = `${DOMAIN_NAME}/customer-type`;
export const URL_EDIT_TYPE_CUSTOMER = (MaLoaiKhach) => `${DOMAIN_NAME}/customer-type/${MaLoaiKhach}`;
export const URL_DELETE_TYPE_CUSTOMER = (MaLoaiKhach) => `${DOMAIN_NAME}/customer-type/${MaLoaiKhach}`;

//REPORT
export const URL_GET_REPORT = (thang, nam) => `${DOMAIN_NAME}/report/${thang}/${nam}`;

//INVOICE
export const URL_GET_LIST_INVOICES = `${DOMAIN_NAME}/invoice`;
export const URL_ADD_NEW_INVOICES = `${DOMAIN_NAME}/invoice`;

//RENT VOUCHER
export const URL_GET_RENT_VOUCHER = `${DOMAIN_NAME}/rent`;

//CONFIG
export const URL_GET_CONFIG = `${DOMAIN_NAME}/setting/config`;

//SURCHARGE
export const URL_GET_LIST_SURCHARGE = `${DOMAIN_NAME}/setting/surcharge`;
