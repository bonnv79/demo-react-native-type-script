import { GET_NEWS, GET_NEWS_BY_ID, REQUEST_CREATE_NEWS, REQUEST_DELETE_NEWS, SET_NEWS, SET_NEWS_BY_ID } from "../const/newsConst"


export const getNews = () => {
  return {
    type: GET_NEWS,
  }
}

export const setNews = (data: any) => {
  return {
    type: SET_NEWS,
    data,
  }
}

export const getNewsById = (data: any) => {
  return {
    type: GET_NEWS_BY_ID,
    data
  }
}

export const setNewsById = (data: any) => {
  return {
    type: SET_NEWS_BY_ID,
    data
  }
}

export const requestCreateNews = (data: any) => {
  return {
    type: REQUEST_CREATE_NEWS,
    data
  }
}

export const requestDeleteNews = (data: any) => {
  return {
    type: REQUEST_DELETE_NEWS,
    data
  }
}