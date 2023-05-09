export const addComma = (mailage) =>
  mailage?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export const addZero = (number) => (number < 10 ? "0" + number : "" + number);

export const myTimeStamp = () => {
  const date = new Date();
  const years = date.getFullYear();
  const months = addZero(date.getMonth() + 1);
  const dates = addZero(date.getDate());

  return `${years}.${months}.${dates}`;
};
