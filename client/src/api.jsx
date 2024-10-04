// First, let's update your api.jsx to handle errors better and use template literals correctly

import axios from "axios";

const URI = "http://localhost:3000";

const api = axios.create({
  baseURL: URI,
  withCredentials: true,
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, msg: 'Network error occurred' };
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, msg: 'Network error occurred' };
  }
};

export const secret = async () => {
  try {
    const response = await api.get('/secret');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, msg: 'Network error occurred' };
  }
};

export const adminPanel = async () => {
  try {
    const response = await api.get('/admin-panel');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, msg: 'Network error occurred' };
  }
};