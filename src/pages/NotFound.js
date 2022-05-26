import { Box, Paper } from "@mui/material";
import image from "../assets/images/404.png";

export default function NotFound() {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 300, sm: 400, md: 600, lg: 600 },
          maxWidth: { xs: 300, sm: 400, md: 600, lg: 600 },
        }}
        alt="404"
        src={image}
      />
    </Paper>
  );
}
