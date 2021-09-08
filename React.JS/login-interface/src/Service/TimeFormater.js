//display the date better and more clear
export const dateFormat = (date) => {
  const myDate = date.toString().replace("T", " ").split(".");
  return myDate[0];
};
