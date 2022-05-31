import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import AuthLogin from "../components/Login/AuthLogin";
import ResetPasswordModal from "../components/Login/ResetPasswordModal";
import * as ActionTypes from "../redux/constants/constant";
import AuthCardWrapper from "../ui-component/AuthCardWrapper";
import AuthWrapper from "../ui-component/AuthWrapper";

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const { userLogin } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseReset = () => {
    setOpenResetPassword(false);
  };

  const handleOpenReset = () => {
    dispatch({ type: ActionTypes.SET_RESET_STATE_1 });
    setOpenResetPassword(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (userLogin) navigate("/", { replace: true });
    }, 1000);
  }, [userLogin]);

  return (
    <>
      <AuthWrapper>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "calc(100vh - 68px)" }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#">
                        <img
                          src={logo}
                          alt="Daijoubu"
                          width="100%"
                          height="60px"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? "column-reverse" : "row"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                          >
                            <Typography
                              color={theme.palette.secondary.main}
                              gutterBottom
                              variant={matchDownSM ? "h3" : "h2"}
                            >
                              Chào mừng bạn đã quay trở lại
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={matchDownSM ? "center" : "inherit"}
                            >
                              Nhập thông tin đăng nhập của bạn để tiếp tục
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin handleOpenReset={handleOpenReset} />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper>
      {openResetPassword && (
        <ResetPasswordModal handleClose={handleCloseReset} />
      )}
    </>
  );
};

export default Login;
