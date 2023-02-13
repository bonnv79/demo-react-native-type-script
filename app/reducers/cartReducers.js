import { ADD_CART_ITEM } from "../const";

const INITIAL_STATE = {
  cartData: {}
};

export default function cartReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cartData: action.data,
      }
    default:
      return state;
  }
}

