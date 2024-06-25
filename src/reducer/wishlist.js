const initialState = {
  totalWishlist: 0,
};
function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREASE_WISHLIST": {
      return {
        ...state,
        totalWishlist: action.payload,
      };
    }
    case "DELETE_WISHLIST": {
      return {
        ...state,
        totalWishlist: action.payload,
      };
    }
    default:
      return state;
  }
}
export default wishlistReducer;
