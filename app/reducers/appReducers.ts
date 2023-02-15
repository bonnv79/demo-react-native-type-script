import { IS_LOADING } from "../const/appConst";

const INITIAL_STATE = {
  loading: false
};

export default function appReducers(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: action.data,
      }
    default:
      return state;
  }
}

