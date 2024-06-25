export const IncreaseNewPrice = (tongprice) => {
  return {
    type: "INCREASE_PRICE",
    payload: tongprice,
  };
};
export const DecreaseNewPrice = (tongprice) => {
  return {
    type: "DECREASE_PRICE",
    payload: tongprice,
  };
};
export const DeleteNewPrice = (tongprice) => {
  return {
    type: "DELETE_PRICE",
    payload: tongprice,
  };
};
