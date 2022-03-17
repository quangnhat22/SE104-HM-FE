import { Box, InputAdornment, OutlinedInput } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";
import { IconSearch } from "@tabler/icons";

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 400,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    "& input": {
      background: "transparent !important",
      paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0,
      background: "#fff",
    },
  })
);

const Search = ({ placeholder, filterName, setFilterName }) => {
  const theme = useTheme();
  return (
    <Box sx={{}}>
      <OutlineInputStyle
        value={filterName}
        onChange={setFilterName}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <IconSearch
              stroke={1.5}
              size="1rem"
              color={theme.palette.grey[500]}
            />
          </InputAdornment>
        }
        inputProps={{ "aria-label": "weight" }}
      />
    </Box>
  );
};

export default Search;
