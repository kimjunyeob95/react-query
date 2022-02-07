export const get_sex = (sex) => {
  switch (sex) {
    case "M":
      return "남성";
    case "F":
      return "여성";
    default:
      return "남성";
  }
};
