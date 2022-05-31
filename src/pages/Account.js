import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountModal from "../components/Account/AccountModal";
import TableAccount from "../components/Table/TableAccount";
import * as ActionSagaTypes from "../redux/constants/constantSaga";
import Search from "../ui-component/Search";

export default function Account() {
  const [filterName, setFilterName] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingAccount, setModifyingAccount] = useState();
  const [modifyingAccountGroup, setModifyingAccountGroup] = useState(0);
  const { userList } = useSelector((state) => state.UserReducer);
  const { userGroupList } = useSelector((state) => state.UserGroupReducer);
  const { loading } = useSelector((state) => state.LoadingReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionSagaTypes.FETCH_LIST_USER_GROUP_SAGA });
    dispatch({ type: ActionSagaTypes.FETCH_LIST_USER_SAGA });
  }, []);

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewAccount = () => {
    setOpenNew(true);
  };

  const handleModify = (account) => {
    let index = userGroupList.findIndex(
      (group) => group.MaNhom === account.MaNhom
    );
    setModifyingAccountGroup(index);
    setModifyingAccount(account);
    setOpenModify(true);
  };

  const handleDelete = (account) => {
    dispatch({
      type: ActionSagaTypes.DELETE_USER_SAGA,
      MaNguoiDung: account.MaNguoiDung,
    });
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Danh sách tài khoản
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Search
          placeholder="Tìm họ và tên, vai trò, email ..."
          filterName={filterName}
          setFilterName={handleFilterByName}
        />
        <Button
          onClick={handleNewAccount}
          variant="outlined"
          sx={{ ml: 2, py: "12px", borderRadius: 3 }}
        >
          Tạo tài khoản
        </Button>
      </Box>

      {openNew && (
        <AccountModal
          handleClose={handleClose}
          type="new"
          userGroupList={userGroupList}
        />
      )}
      {openModify && (
        <AccountModal
          handleClose={handleClose}
          type="modify"
          account={modifyingAccount}
          userGroupList={userGroupList}
          userGroupIndex={modifyingAccountGroup}
        />
      )}
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "4rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableAccount
          data={userList}
          filterName={filterName}
          handleModify={handleModify}
          handleDelete={handleDelete}
        />
      )}
    </Paper>
  );
}
