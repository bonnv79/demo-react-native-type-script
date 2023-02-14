import { ADD_CART_ITEM } from "../const";

export const addCartItem = (data: any) => {
  return {
    type: ADD_CART_ITEM,
    data,
  }
}