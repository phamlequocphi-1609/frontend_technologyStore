import { combineReducers } from "redux";
import qtyReducer from "./qty";
import priceReducer from "./price";
import wishlistReducer from "./wishlist";

const rootReducer = combineReducers({
  tongqty: qtyReducer,
  tongprice: priceReducer,
  totalWishlist: wishlistReducer,
});
export default rootReducer;
