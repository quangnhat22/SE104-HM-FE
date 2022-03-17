import value from "assets/scss/_themes-vars.module.scss";

const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

const hasMixed = (number) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

export const strengthColor = (count) => {
  if (count < 2) return { label: "Rất yếu", color: value.errorMain };
  if (count < 3) return { label: "Yếu", color: value.warningDark };
  if (count < 4) return { label: "Bình thường", color: value.orangeMain };
  if (count < 5) return { label: "Mạnh", color: value.successMain };
  if (count < 6) return { label: "Rất mạnh", color: value.successDark };
  return { label: "Poor", color: value.errorMain };
};

export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
