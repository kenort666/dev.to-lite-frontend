import { AxiosResponse } from 'axios';
import $api from '../api';

export default class ImgService {
  static async uploadImg(
    params: FormData
  ): Promise<AxiosResponse<{ url: string }>> {
    return $api.post<{ url: string }>('/upload', params);
  }
}
