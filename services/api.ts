import axios from 'axios';

const TOKEN_SERVER_URL = 'https://gau-server.glitch.me/notifications'
const EXPO_SERVER_URL = 'https://exp.host/--/api/v2/push/send'

export interface Token {
  id: number
  token: string
}

export const submitToken = async (token: string) => {
  const response = await axios.post(TOKEN_SERVER_URL, { token })
  const result = response.data as Token
  return result
}

export const getToken = async (id: number | string) => {
  const response = await axios.get(`${TOKEN_SERVER_URL}/${id}`)
  const result = response.data as Token
  return result
}

export const sendPushNotification = async (pushToken: string, title: string, body: string) => {
  const message = {
    to: pushToken,
    sound: 'default',
    title,
    body,
  }

  await axios.post(EXPO_SERVER_URL, message)
  alert('Triệu hồi bạn trai 👦 thành công!')
}

export const getItems = async () => {
  const response = await axios.get(`https://express-bng.vercel.app/api/records`);
  const result = response?.data;
  return result || {};
}

export const getItemsByPage = async () => {
  const response = await axios.get(`https://express-bng.vercel.app/api/record?page=0&pageSize=10`);
  const result = response?.data;
  return result || {};
}

export const createItem = async (data: any) => {
  const req = {
    name: data?.title,
    position: data?.content,
  }
  await axios.post('https://express-bng.vercel.app/api/record/add', req)
  // alert('Create item successlly')
}

export const deleteItem = async (id: String) => {
  const response = await axios.delete(`https://express-bng.vercel.app/api/record/${id}`);
  const result = response?.data;
  return result || {};
}