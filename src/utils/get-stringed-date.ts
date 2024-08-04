export const getStringedDate = (date: Date) => {
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  if (Number(month) < 10) {
    month = "0" + month;
  }

  if (Number(day) < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};
