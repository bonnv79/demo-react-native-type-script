import { SET_LOGIN } from "../const/user";

export const setToken = (data: any) => {
  return {
    type: SET_LOGIN,
    data,
  }
}