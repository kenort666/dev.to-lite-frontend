import { AxiosResponse } from 'axios';
import { IAuthResponse, IAuth } from '../@types';
import $api from '../api';

export default class AuthService {
  static async fetchUserLogin(
    params: IAuth
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post('/login', params);
  }

  static async fetchUserRegistration(
    params: IAuth
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', params);
  }

  static async fetchUserLogout(): Promise<void> {
    return $api.post('/logout');
  }
}
