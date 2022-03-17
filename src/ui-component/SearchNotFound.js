import { Paper, Typography } from "@mui/material";

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        Không có kết quả cho &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Thử kiểm tra lỗi chính tả
        hoặc sử dụng các từ hoàn chỉnh.
      </Typography>
    </Paper>
  );
}
