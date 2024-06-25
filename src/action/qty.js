export const IncreaseNewQty = (tongqty) => {
  return {
    type: "INCREASE_QTY",
    payload: tongqty,
  };
};
export const DecreaseNewQty = (tongqty) => {
  return {
    type: "DECREASE_QTY",
    payload: tongqty,
  };
};
export const DeleteNewQty = (tongqty) => {
  return {
    type: "DELETE_QTY",
    payload: tongqty,
  };
};
