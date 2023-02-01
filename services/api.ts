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

const rootPath = 'https://express-bng.vercel.app/api';

export const getItems = async () => {
  try {
    const response = await axios.get(`${rootPath}/items`);
    return response?.data;
  } catch (error: any) {
    return error;
  }
}

export const getItemsByPage = async () => {
  try {
    const response = await axios.get(`${rootPath}/item`);
    return response?.data;
  } catch (error: any) {
    return error;
  }
}

export const createItem = async (data: any) => {
  try {
    const req = {
      ...data
    }
    return await axios.post(`${rootPath}/item/add`, req);
  } catch (error: any) {
    return error;
  }
}

export const deleteItem = async (id: String) => {
  try {
    const response = await axios.delete(`${rootPath}/item/${id}`);
    return response?.data;
  } catch (error: any) {
    return error;
  }
}