export const addComma = (mailage) => {
  return mailage?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
