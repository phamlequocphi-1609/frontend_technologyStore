const initialState = {
  tongprice: 0,
};
function priceReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREASE_PRICE": {
      return {
        ...state,
        tongprice: action.payload,
      };
    }
    case "DECREASE_PRICE": {
      return {
        ...state,
        tongprice: action.payload,
      };
    }
    case "DELETE_PRICE": {
      return {
        ...state,
        tongprice: action.payload,
      };
    }
    default:
      return state;
  }
}
export default priceReducer;
