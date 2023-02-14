import { SET_LOGIN } from "../const/user";

export const setToken = (data) => {
  return {
    type: SET_LOGIN,
    data,
  }
}