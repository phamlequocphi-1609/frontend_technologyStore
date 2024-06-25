export const IncreaseWishlist = (totalWishlist) => {
  return {
    type: "INCREASE_WISHLIST",
    payload: totalWishlist,
  };
};
export const DeleteWishlist = (totalWishlist) => {
  return {
    type: "DELETE_WISHLIST",
    payload: totalWishlist,
  };
};
