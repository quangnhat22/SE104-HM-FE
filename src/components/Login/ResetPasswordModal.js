import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import ResetForm from "./ResetForm";
import SendEmailForm from "./SendEmailForm";

export default function ResetPasswordModal({ handleClose }) {
  const [resetState, setResetState] = useState("send");

  const handleSendEmail = () => {
    toast.success("Đã gửi mã xác nhận vào email. Vui lòng kiểm tra hòm thư!");
    setResetState("reset");
  };

  const handleResetPassword = () => {
    toast.success("Thay đổi mật khẩu thành công!");
    handleClose();
  };

  const handleBack = () => {
    setResetState("send");
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20, alignSelf: "center" }}>
        Thay đổi mật khẩu
      </DialogTitle>
      <DialogContent>
        {resetState === "send" ? (
          <SendEmailForm
            handleClose={handleClose}
            handleSubmit={handleSendEmail}
          />
        ) : (
          <ResetForm
            handleClose={handleClose}
            handleSubmit={handleResetPassword}
            handleBack={handleBack}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
