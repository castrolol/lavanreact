import axios from "axios";
import { BASE_URL } from "../res/URLS";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {

  let stateStorage = window.localStorage.getItem('@app');

  try {
    stateStorage = JSON.parse(stateStorage);
  } catch (e) {

  }

  if (stateStorage?.access_token) {
    config.headers['authorization'] = `Bearer ${stateStorage?.access_token}`;
  }

  return config;

}, function (error) { 
  return Promise.reject(error);
})

export default instance;

