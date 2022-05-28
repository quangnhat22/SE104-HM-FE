import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AccountModal from "../components/Account/AccountModal";
import TableAccount from "../components/Table/TableAccount";
import Search from "../ui-component/Search";
import { toast } from "react-toastify";

function createData(MaTaiKhoan, HoTen, TenNhom, Email, MaNhom) {
  return { MaTaiKhoan, HoTen, TenNhom, Email, MaNhom };
}

const accountList = [
  createData("232dsa", "Phú Quang", "Admin", "phuquang@gmail.com", "N001"),
  createData("232dsa", "Đỗ Phú Quang", "Admin", "phuquang@gmail.com", "N001"),
];

const accountGroupList = [
  {
    MaNhom: "N001",
    TenNhom: "Admin",
  },
  {
    MaNhom: "N002",
    TenNhom: "Nô tì",
  },
];

export default function Account() {
  const [filterName, setFilterName] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingAccount, setModifyingAccount] = useState();
  const [modifyingAccountGroup, setModifyingAccountGroup] = useState(0);

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewAccount = () => {
    setOpenNew(true);
  };

  const handleNewPassword = () => {
    toast.success("new password");
  };

  const handleModify = (account) => {
    let index = accountGroupList.findIndex(
      (group) => group.MaNhom === account.MaNhom
    );
    setModifyingAccountGroup(index);
    setModifyingAccount(account);
    setOpenModify(true);
  };

  const handleDelete = (account) => {
    toast.success("account deleted");
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
          accountGroups={accountGroupList}
        />
      )}
      {openModify && (
        <AccountModal
          handleClose={handleClose}
          type="modify"
          account={modifyingAccount}
          accountGroups={accountGroupList}
          groupIndex={modifyingAccountGroup}
        />
      )}
      {/* {loading ? (
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
      ) : ( */}
      <TableAccount
        data={accountList}
        filterName={filterName}
        handleNewPassword={handleNewPassword}
        handleModify={handleModify}
        handleDelete={handleDelete}
      />
      {/* )} */}
    </Paper>
  );
}
