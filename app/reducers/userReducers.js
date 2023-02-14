import { SET_LOGIN } from "../const/user";

const INITIAL_STATE = {
  token: ''
};

export default function userReducers(state = INITIAL_STATE, action) {
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

