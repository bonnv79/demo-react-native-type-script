import { SET_LOGIN } from "../const/userConst";

const INITIAL_STATE = {
  token: 'admin'
};

export default function userReducers(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        token: action.data,
      }
    default:
      return state;
  }
}

