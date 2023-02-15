import { createSelector } from 'reselect';

export const getNewsDataState = (state: any) => {
  return state.news.newsList;
};

export const getNewsDataSelector = createSelector( // use to have handle logic for data 
  [getNewsDataState],
  (data) => {
    return data;
  }
);

export const getNewsInfoState = (state: any) => {
  return state.news.newsInfo;
};