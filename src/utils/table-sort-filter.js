import { filter } from "lodash";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function applySortFilter(array, order, orderBy, query) {
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  const result = stabilizedThis.map((el) => el[0]);
  if (query) {
    return filter(
      result,
      (_element) => JSON.stringify(_element).toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return result;
}
