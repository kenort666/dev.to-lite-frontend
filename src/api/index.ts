import axios from 'axios';
import { IAuthResponse } from '../@types';
import { toast } from 'react-toastify';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const origRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      origRequest._isRetry = true;
      try {
        const res = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', res.data.accessToken);
        return $api.request(origRequest);
      } catch (err) {
        toast.error('Не авторизован');
      }
    }
    throw error;
  }
);

export default $api;
