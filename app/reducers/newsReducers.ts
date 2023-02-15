import { SET_NEWS, SET_NEWS_BY_ID } from "../const/newsConst";

const INITIAL_STATE = {
  newsList: [],
  newsInfo: {}
};

export default function newsReducers(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        newsList: action.data,
      }
    case SET_NEWS_BY_ID:
      return {
        ...state,
        newsInfo: action.data,
      }
    default:
      return state;
  }
}

