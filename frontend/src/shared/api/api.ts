import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:3000/',
  withCredentials: true, // обязательно!
});

export default api;
