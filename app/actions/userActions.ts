import { SET_LOGIN } from "../const/userConst";

export const setToken = (data: any) => {
  return {
    type: SET_LOGIN,
    data,
  }
}