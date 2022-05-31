import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as ActionTypes from "../../redux/constants/constant";
import * as ActionSagaTypes from "../../redux/constants/constantSaga";
import ResetForm from "./ResetForm";
import SendEmailForm from "./SendEmailForm";

export default function ResetPasswordModal({ handleClose }) {
  const { resetState } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const handleSendEmail = (email) => {
    dispatch({ type: ActionSagaTypes.FORGOT_PASSWORD_SAGA, email });
  };

  const handleResetPassword = (resetContent) => {
    dispatch({ type: ActionSagaTypes.RESET_PASSWORD_SAGA, resetContent });
    handleClose();
  };

  const handleBack = () => {
    dispatch({ type: ActionTypes.SET_RESET_STATE_1 });
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20, alignSelf: "center" }}>
        Thay đổi mật khẩu
      </DialogTitle>
      <DialogContent>
        {resetState === 1 ? (
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
