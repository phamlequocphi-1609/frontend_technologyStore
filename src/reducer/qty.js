const initialState = {
  tongqty: 0,
};
function qtyReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREASE_QTY": {
      return {
        ...state,
        tongqty: action.payload,
      };
    }
    case "DECREASE_QTY": {
      return {
        ...state,
        tongqty: action.payload,
      };
    }
    case "DELETE_QTY": {
      return {
        ...state,
        tongqty: action.payload,
      };
    }
    default:
      return state;
  }
}
export default qtyReducer;
